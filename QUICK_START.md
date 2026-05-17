# SlotCut - Quick Start Deployment Guide

## Overview
SlotCut is a full-stack salon booking platform built with Next.js (frontend), Spring Boot (backend), and PostgreSQL (database). This guide walks you through deploying each component to free-tier services.

---

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Backend Deployment (Railway)](#backend-deployment-railway)
4. [Database Setup (Supabase)](#database-setup-supabase)
5. [Connecting Components](#connecting-components)
6. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Prerequisites
- Node.js 18+ & pnpm or npm
- Java 17+ & Gradle
- PostgreSQL 14+
- Git

### Frontend Setup
```bash
# Extract frontend archive
tar -xzf slotcut-frontend.tar.gz
cd app

# Install dependencies
pnpm install

# Create .env.local (copy from .env.local.example)
cp .env.local.example .env.local

# Update with your backend URL
# NEXT_PUBLIC_API_URL=http://localhost:8080

# Run development server
pnpm dev
# Open http://localhost:3000
```

### Backend Setup
```bash
# Extract backend archive
tar -xzf slotcut-backend.tar.gz
cd slotcut-backend

# Create application.yml (update database credentials)
# See src/main/resources/application.yml

# Build the project
./gradlew build

# Run the application
./gradlew bootRun
# Server runs on http://localhost:8080
```

### Database Setup (Local PostgreSQL)
```bash
# Create database
createdb slotcut_db

# The Flyway migrations will run automatically on app startup
# Initial schema and sample data will be created
```

---

## Frontend Deployment (Vercel)

### Option 1: Git Integration (Recommended)
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/slotcut.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Select your `slotcut` repository
   - Leave build settings as default
   - Click "Deploy"

3. **Set Environment Variables**
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL=https://your-backend-railway-url.com`
   - Redeploy

### Option 2: Direct Upload
1. Extract `slotcut-frontend.tar.gz`
2. Go to [vercel.com](https://vercel.com)
3. Click "Upload Project"
4. Select the extracted folder
5. Configure environment variables
6. Click "Deploy"

**Result:** Frontend deployed at `your-project.vercel.app`

---

## Backend Deployment (Railway)

Railway offers $5/month free credit (sufficient for this project).

### Steps

1. **Prepare for Deployment**
   - Extract `slotcut-backend.tar.gz`
   - Ensure all migrations are in `src/main/resources/db/migration/`

2. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub or email
   - Create new project

3. **Deploy via Railway CLI**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login
   railway login
   
   # Create project in Railway
   cd slotcut-backend
   railway init
   
   # Deploy
   railway up
   ```

4. **Configure Database Connection**
   - In Railway dashboard, add PostgreSQL plugin
   - Copy database credentials
   - Update `application.yml`:
     ```yaml
     spring:
       datasource:
         url: jdbc:postgresql://host:port/dbname
         username: ${RAILWAY_DATABASE_USERNAME}
         password: ${RAILWAY_DATABASE_PASSWORD}
     ```

5. **Set Environment Variables in Railway**
   - Database URL
   - Database Username
   - Database Password
   - JWT Secret (generate: `openssl rand -base64 32`)

**Result:** Backend deployed at `https://your-backend-railway-app.up.railway.app`

---

## Database Setup (Supabase)

Supabase provides free PostgreSQL hosting with automatic backups.

### Steps

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub
   - Create new project
   - Choose region closest to you
   - Set database password
   - Wait for database to initialize (~2 minutes)

2. **Run Flyway Migrations**
   
   **Option A: Using DBeaver or pgAdmin**
   - Download connection string from Supabase dashboard
   - Connect to database
   - Run migration files from `src/main/resources/db/migration/` in order

   **Option B: Using psql**
   ```bash
   # Get connection string from Supabase
   psql "postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres"
   
   # Run migrations
   \i src/main/resources/db/migration/V1__Initial_Schema.sql
   \i src/main/resources/db/migration/V2__Add_Sample_Data.sql
   \i src/main/resources/db/migration/V3__Add_JWT_Token_Table.sql
   \i src/main/resources/db/migration/V4__Add_Rating_and_Reviews.sql
   \i src/main/resources/db/migration/V5__Add_Email_Notifications.sql
   ```

3. **Update Backend Configuration**
   - Use Supabase connection string in Railway environment variables
   - Format: `postgresql://user:password@host:port/database`

---

## Connecting Components

### Update Frontend Environment Variables

In Vercel project settings:
```env
NEXT_PUBLIC_API_URL=https://your-backend-railway-app.up.railway.app
NEXT_PUBLIC_APP_NAME=SlotCut
NEXT_PUBLIC_APP_DESCRIPTION=Book salon slots in 30 seconds
```

### Update Backend Configuration

Ensure all services are connected:
1. Database: Supabase PostgreSQL ✓
2. Email (Optional): Add Resend API key for notifications
   ```yaml
   app:
     email:
       provider: resend
       api-key: ${RESEND_API_KEY}
   ```

### Test Integration

1. Open `https://your-project.vercel.app`
2. Try booking a salon
3. Check backend logs for API calls
4. Verify database entries in Supabase

---

## Database Migrations

The project includes 5 Flyway migrations:

| File | Purpose |
|------|---------|
| `V1__Initial_Schema.sql` | Users, Salons, Services, Bookings, Slots |
| `V2__Add_Sample_Data.sql` | Demo salons and services |
| `V3__Add_JWT_Token_Table.sql` | Token blacklist for logout |
| `V4__Add_Rating_and_Reviews.sql` | Ratings system |
| `V5__Add_Email_Notifications.sql` | Notification tracking |

Run migrations automatically via Spring Boot on startup.

---

## Architecture

```
Frontend (Vercel)
    ↓ API calls
Backend (Railway)
    ↓ Database queries
Database (Supabase PostgreSQL)
```

**API Endpoints:**
- `POST /api/auth/login` - Owner login
- `GET /api/salons` - List all salons
- `GET /api/salons/{id}` - Salon details
- `POST /api/bookings` - Create booking
- `GET /api/bookings/{userId}` - User bookings
- `GET /api/bookings/salon/{salonId}` - Salon bookings

---

## Troubleshooting

### "Cannot connect to backend"
- Check `NEXT_PUBLIC_API_URL` in Vercel
- Verify backend is running on Railway
- Check CORS configuration in Spring Boot

### "Database connection failed"
- Verify credentials in Railway env vars
- Check Supabase firewall allows Railway IP
- Test connection with psql CLI

### "Migrations not running"
- Check Flyway version in `build.gradle`
- Verify SQL syntax (use UTF-8 encoding)
- Check database user has CREATE TABLE permissions

### "502 Bad Gateway on Vercel"
- Check frontend build logs
- Verify all required env vars are set
- Rebuild and redeploy

---

## Next Steps

1. Connect to a domain (Vercel + Railway both support custom domains)
2. Enable authentication (Google OAuth, Phone OTP)
3. Add email notifications (Resend or SendGrid)
4. Setup monitoring (Sentry for errors)
5. Add analytics (PostHog)

---

## Support & Resources

- **Frontend Docs:** [nextjs.org](https://nextjs.org)
- **Backend Docs:** [spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
- **Database Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Deployment:**
  - [Vercel Docs](https://vercel.com/docs)
  - [Railway Docs](https://docs.railway.app)

---

**Happy Deploying! 🚀**

For detailed deployment instructions, see `DEPLOYMENT.md`
