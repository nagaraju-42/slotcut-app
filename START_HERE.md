# SlotCut - START HERE

Welcome to SlotCut! This document guides you through your complete project and deployment options.

---

## What is SlotCut?

SlotCut is a production-ready salon booking platform that lets students book services in 30 seconds without creating an account. It includes a mobile-first web interface, powerful owner dashboard, and complete Spring Boot backend with PostgreSQL database.

**Key Facts:**
- ✓ Full-stack application (Frontend + Backend + Database)
- ✓ Ready for deployment to free-tier services
- ✓ Mobile-optimized (iPhone → Desktop)
- ✓ 3 deployment archives included
- ✓ Complete database migrations
- ✓ JWT authentication with owner login
- ✓ Comprehensive documentation included

---

## What You Have

### 1. Deployment Archives (in `archives/` folder)

| Archive | Size | Purpose | Deploy To |
|---------|------|---------|-----------|
| **slotcut-frontend.tar.gz** | 65 KB | Next.js application | Vercel (FREE) |
| **slotcut-backend.tar.gz** | 12 KB | Spring Boot API | Railway ($5/mo) |
| **slotcut-complete.tar.gz** | 77 KB | Full project | Docker/Local dev |

**Download & Extract:**
```bash
# Extract archives
tar -xzf slotcut-frontend.tar.gz    # Frontend only
tar -xzf slotcut-backend.tar.gz     # Backend only
tar -xzf slotcut-complete.tar.gz    # Both + docs
```

### 2. Documentation (4 comprehensive guides)

| Document | Purpose | Read Time |
|----------|---------|-----------|
| **QUICK_START.md** | 🚀 **START HERE** for deployment | 10 min |
| **PROJECT_SUMMARY.md** | Complete project overview & features | 15 min |
| **DEPLOYMENT.md** | Detailed deployment instructions | 20 min |
| **README.md** | Architecture & tech stack | 10 min |

### 3. Project Files (included in archives)

```
Frontend (Next.js 16)
├── 10 pages with routing
├── 5 reusable components
├── Dark theme with responsive design
└── Ready for Vercel deployment

Backend (Spring Boot 3.x)
├── REST API with 10+ endpoints
├── JWT authentication
├── Database integration
└── Ready for Railway deployment

Database (PostgreSQL)
├── 8 tables (normalized schema)
├── 5 Flyway migrations
├── Sample data included
└── Ready for Supabase

Documentation
├── Deployment guides
├── API documentation
├── Setup instructions
└── Troubleshooting
```

---

## Quick Decision Guide

### Choose Your Path:

#### 🚀 Path 1: Deploy to Cloud (FASTEST - 30 minutes)
**Goal:** Get SlotCut live on the internet immediately

1. **Extract:** `slotcut-frontend.tar.gz`
2. **Read:** `QUICK_START.md` (Frontend section)
3. **Deploy:** Follow Vercel instructions (FREE, takes 5 min)
4. **Extract:** `slotcut-backend.tar.gz`
5. **Read:** `QUICK_START.md` (Backend section)
6. **Deploy:** Follow Railway instructions ($5/month)
7. **Database:** Setup Supabase (FREE)

**Result:** Live at `https://your-app.vercel.app`

---

#### 💻 Path 2: Local Development (30 minutes)
**Goal:** Run everything locally for development/testing

1. **Extract:** `slotcut-complete.tar.gz`
2. **Install Dependencies:** Node.js 18+, Java 17+, PostgreSQL 14+
3. **Frontend:** `cd app && pnpm install && pnpm dev`
4. **Backend:** `cd slotcut-backend && ./gradlew bootRun`
5. **Database:** Migrations run automatically

**Result:** Frontend at `http://localhost:3000`, API at `http://localhost:8080`

---

#### 📦 Path 3: Docker Compose (20 minutes)
**Goal:** Run complete stack with Docker

1. **Extract:** `slotcut-complete.tar.gz`
2. **Install:** Docker & Docker Compose
3. **Run:** `docker-compose up`
4. **Access:** Frontend at `http://localhost:3000`

**Result:** All 3 services running (Frontend, Backend, Database)

---

## Step-by-Step Deployment (Path 1 - RECOMMENDED)

### Total Time: ~30-40 minutes

#### Step 1: Create Vercel Account (2 min)
```
1. Go to vercel.com
2. Sign up with GitHub
3. Create new team (or skip)
```

#### Step 2: Deploy Frontend (5 min)
```bash
# Extract
tar -xzf slotcut-frontend.tar.gz

# Option A: Git Push + Deploy
git init
git remote add origin https://github.com/YOUR_USERNAME/slotcut
git push -u origin main
# → Connect to Vercel in dashboard

# Option B: Direct Upload
# → Upload folder in Vercel dashboard
```
**Result:** `your-project.vercel.app` ✓

#### Step 3: Create Railway Account (1 min)
```
1. Go to railway.app
2. Sign up with GitHub
3. Create project
```

#### Step 4: Deploy Backend (10 min)
```bash
# Extract
tar -xzf slotcut-backend.tar.gz
cd slotcut-backend

# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway login
railway init
railway up
```
**Result:** `your-backend.railway.app` ✓

#### Step 5: Setup Supabase (5 min)
```
1. Go to supabase.com
2. Sign up with GitHub
3. Create project
4. Run migrations (copy-paste SQL)
```
**Result:** PostgreSQL database ✓

#### Step 6: Connect Everything (5 min)
```
1. Vercel: Add env var NEXT_PUBLIC_API_URL
2. Railway: Add DB credentials
3. Test: Open your-project.vercel.app
```
**Result:** Full-stack app live! 🚀

---

## What Each Component Does

### Frontend (Next.js)
- **Student Interface:**
  - Browse salons near you
  - Search and filter
  - View services & prices
  - Book in 30 seconds
  - See booking history

- **Owner Interface:**
  - Login with phone + PIN
  - See today's bookings
  - Manage slot availability
  - View metrics & analytics

**Technologies:** Next.js 16, React 19, Tailwind CSS, shadcn/ui

---

### Backend (Spring Boot)
- **REST API** with 10+ endpoints
- **Authentication** with JWT tokens
- **Database layer** with JPA
- **Business logic** for bookings
- **Email integration** ready

**Technologies:** Spring Boot 3.x, PostgreSQL, Flyway

---

### Database (PostgreSQL)
- **8 tables:** Users, Salons, Services, Bookings, Slots, Ratings, Notifications
- **5 migrations:** Schema, sample data, auth, ratings, notifications
- **Sample data:** 2 salons with 6 services pre-loaded
- **Automatic backups** with Supabase

**Technologies:** PostgreSQL 14+, Flyway migrations

---

## Architecture Overview

```
┌──────────────────────────────────────┐
│    Your Browser / Mobile              │
└─────────────┬────────────────────────┘
              │ HTTPS (encrypted)
              ↓
┌──────────────────────────────────────┐
│   Frontend (Vercel)                   │
│   ├─ Landing page                     │
│   ├─ Salon listing                    │
│   ├─ Booking flow                     │
│   └─ Owner dashboard                  │
└─────────────┬────────────────────────┘
              │ API calls (JSON)
              ↓
┌──────────────────────────────────────┐
│   Backend (Railway)                   │
│   ├─ /api/auth (login)                │
│   ├─ /api/salons (CRUD)              │
│   ├─ /api/bookings (create/list)     │
│   └─ /api/dashboard (metrics)        │
└─────────────┬────────────────────────┘
              │ SQL queries
              ↓
┌──────────────────────────────────────┐
│   Database (Supabase PostgreSQL)     │
│   ├─ Users table                      │
│   ├─ Salons & Services                │
│   ├─ Bookings & Slots                 │
│   └─ Ratings & Notifications          │
└──────────────────────────────────────┘
```

---

## Free Tier Costs

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Vercel** | 100GB bandwidth/month | $0 |
| **Railway** | $5 credit/month | $0 (covers ~2 small apps) |
| **Supabase** | 500MB DB, 2 projects | $0 |
| **Total Monthly** | - | **$0** (or $5 if you want more Railway) |

Perfect for learning, testing, and small deployments!

---

## File Structure

```
SlotCut/
├── archives/
│   ├── slotcut-frontend.tar.gz     ← Download this
│   ├── slotcut-backend.tar.gz      ← Download this
│   └── slotcut-complete.tar.gz     ← Or this for everything
│
├── Documentation (YOU ARE HERE)
│   ├── START_HERE.md               ← You are here
│   ├── QUICK_START.md              ← Read next for deployment
│   ├── PROJECT_SUMMARY.md          ← Project overview
│   └── DEPLOYMENT.md               ← Detailed instructions
│
├── Frontend (in slotcut-frontend.tar.gz)
│   ├── app/                        ← Pages & routing
│   ├── components/                 ← React components
│   ├── lib/                        ← Constants & utilities
│   ├── package.json                ← Dependencies
│   └── next.config.mjs             ← Next.js config
│
├── Backend (in slotcut-backend.tar.gz)
│   ├── src/main/
│   │   ├── java/com/slotcut/       ← Java code
│   │   └── resources/
│   │       └── db/migration/       ← Database migrations
│   ├── build.gradle                ← Dependencies
│   └── Dockerfile                  ← Container config
│
└── Configuration
    ├── docker-compose.yml          ← Local dev stack
    ├── vercel.json                 ← Vercel config
    └── .env.*.example              ← Environment templates
```

---

## Troubleshooting Guide

### Common Issues

**"Frontend won't connect to backend"**
- ✓ Check API URL in Vercel env vars
- ✓ Verify backend is running
- ✓ Check CORS headers in Spring Boot

**"Database migration fails"**
- ✓ Verify PostgreSQL is running
- ✓ Check database user permissions
- ✓ Ensure all SQL files are valid UTF-8

**"Can't login to owner dashboard"**
- ✓ Try: phone=`1234567890`, pin=`1234`
- ✓ Check backend logs
- ✓ Verify JWT secret is configured

**"502 error on Vercel"**
- ✓ Check build logs
- ✓ Verify env variables
- ✓ Redeploy project

See **DEPLOYMENT.md** for detailed troubleshooting.

---

## Next Steps

### Immediate (This Session)
1. ✓ Read `QUICK_START.md`
2. ✓ Extract one of the archives
3. ✓ Deploy frontend to Vercel
4. ✓ Deploy backend to Railway
5. ✓ Setup Supabase database

### Short Term (This Week)
1. Test full booking flow
2. Add custom domain
3. Enable SSL/HTTPS
4. Configure email notifications

### Medium Term (This Month)
1. Add user authentication
2. Setup analytics
3. Add payment integration
4. Improve UI based on feedback

### Long Term (Next Quarter)
1. Mobile app (React Native)
2. Advanced features
3. Scale to more users
4. Add marketplace/integrations

---

## Resources

### Documentation in This Project
- `QUICK_START.md` - Fastest path to deployment
- `PROJECT_SUMMARY.md` - Complete feature list
- `DEPLOYMENT.md` - Detailed instructions
- `README.md` - Technical architecture

### External Resources
- **Frontend:** [nextjs.org/docs](https://nextjs.org/docs)
- **Backend:** [spring.io](https://spring.io)
- **Database:** [supabase.com/docs](https://supabase.com/docs)
- **Deployment:** [vercel.com/docs](https://vercel.com/docs), [railway.app/docs](https://docs.railway.app)

---

## Need Help?

1. **Can't deploy?** → Check `QUICK_START.md` troubleshooting section
2. **Want more features?** → See ideas in `PROJECT_SUMMARY.md`
3. **Understanding architecture?** → Read `DEPLOYMENT.md`
4. **Want local development?** → See `README.md` or Path 2 above

---

## Summary

You have a complete, production-ready salon booking platform:

✓ **Mobile-first web application** (Next.js 16)
✓ **Professional REST API** (Spring Boot 3.x)
✓ **Production database** (PostgreSQL)
✓ **5 database migrations** (with sample data)
✓ **3 deployment archives** (ready to deploy)
✓ **4 comprehensive guides** (for all skill levels)
✓ **Free deployment** (Vercel + Railway + Supabase)
✓ **Complete documentation** (inline code comments)

---

## Ready to Deploy?

**Next Action:** Open `QUICK_START.md` and follow the deployment steps.

It takes about 30-40 minutes to go from archives to live application on the web.

**Let's build something amazing! 🚀**

---

**Questions?** Check the docs or review the code. Everything is well-documented!

**Last Updated:** May 16, 2026
**Project Status:** MVP Ready for Production
