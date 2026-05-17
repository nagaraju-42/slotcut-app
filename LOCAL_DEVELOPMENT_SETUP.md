# SlotCut - Complete Local Development Setup Guide

## Prerequisites Check

Before you start, make sure you have these installed:

### For Frontend (VS Code)
- **Node.js** (v18+): Download from https://nodejs.org
  - Check: `node --version` (should show v18+)
  - Check: `npm --version` (should show v9+)

### For Backend (STS)
- **Java 17+**: Download from https://www.oracle.com/java/technologies/downloads/
  - Check: `java -version` (should show version 17+)
- **Spring Tool Suite (STS)**: Download from https://spring.io/tools
- **Gradle**: Usually included with STS

### For Database
- **Supabase Account**: Already have it ✓
- **pgAdmin** (optional for database viewing)

---

## PART 1: FRONTEND SETUP (VS Code)

### Step 1.1: Open Frontend Project in VS Code

```bash
# Navigate to your project
cd /path/to/slotcut-app

# Open in VS Code
code .
```

You should see:
```
slotcut-app/
├── app/          ← Pages
├── components/   ← React components
├── lib/          ← Utilities
├── public/       ← Static files
├── package.json
├── next.config.mjs
└── ...
```

### Step 1.2: Install Frontend Dependencies

Open Terminal in VS Code (Ctrl+` or View → Terminal)

```bash
# Install pnpm globally (if not installed)
npm install -g pnpm

# Install project dependencies
pnpm install
```

You should see:
```
✓ Resolved 45 packages
✓ Installed 45 packages
```

Takes about 2-3 minutes. If it gets stuck, press Ctrl+C and retry.

### Step 1.3: Create .env.local File

In VS Code, create a new file in root:

**File: `.env.local`**

```env
# Backend API (leave as localhost for now)
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# For later Supabase integration
NEXT_PUBLIC_SUPABASE_URL=https://kcjqgtfrsenbuiahnozb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 1.4: Start Frontend Development Server

In terminal, run:

```bash
pnpm dev
```

You should see:
```
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

**✅ Frontend is running!** Go to http://localhost:3000

You should see the SlotCut landing page with dark theme and saffron orange buttons.

---

## PART 2: BACKEND SETUP (Spring Tool Suite)

### Step 2.1: Import Backend into STS

1. **Open Spring Tool Suite**

2. **File → Import...**

3. **Select "Existing Maven Projects"** (or Gradle for our case)
   - Actually select: **Gradle → Existing Gradle Project**

4. **Browse to:** `/path/to/slotcut-app/slotcut-backend`

5. **Click Finish**

Wait 2-3 minutes while STS downloads dependencies and indexes files.

### Step 2.2: Configure Database Connection

In STS, open file: `slotcut-backend/src/main/resources/application.yml`

Find this section and update it:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
    username: postgres
    password: Specter@2027123
    
  jpa:
    hibernate:
      ddl-auto: validate
```

**Note:** Change `ddl-auto` from `create` to `validate` so it doesn't create tables (migrations will handle it)

### Step 2.3: Run Migrations First (Important!)

Before running Spring Boot, we need to run database migrations.

**Option A: Using Gradle in STS**

In STS Terminal:
```bash
cd slotcut-backend
./gradlew flywayMigrate
```

Should output:
```
Successfully validated 5 migrations (executed 0, pending 5)
Successfully applied 5 migrations
```

**Option B: Using Supabase Console Directly**

1. Go to https://supabase.com/dashboard
2. Click your project → SQL Editor
3. Create new query
4. Copy content from: `slotcut-backend/src/main/resources/db/migration/V1__Initial_Schema.sql`
5. Paste and run
6. Repeat for V2, V3, V4, V5 files

### Step 2.4: Start Backend Server

In STS:

1. **Right-click** on `slotcut-backend` project
2. **Run As → Spring Boot App**

OR in Terminal:

```bash
cd slotcut-backend
./gradlew bootRun
```

Wait about 10-15 seconds...

You should see:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__, |_|_|_| .__/ |_/ / / / /
 =========|_|==============|_/==/_/_/_/

Tomcat started on port(s): 8080
Started SlotcutApplication in 3.2 seconds
```

**✅ Backend is running!** Access it at http://localhost:8080

---

## PART 3: TEST THE APPLICATION

### Test 3.1: Test Backend API

Open a browser or Postman and test these endpoints:

**1. Get all salons:**
```
GET http://localhost:8080/api/salons
```

Expected response:
```json
[
  {
    "id": "salon-1",
    "name": "Prime Salon",
    "address": "123 Main St, Downtown",
    "rating": 4.8,
    "services": [...]
  }
]
```

**2. Get salon details:**
```
GET http://localhost:8080/api/salons/salon-1
```

**3. Get available slots:**
```
GET http://localhost:8080/api/salons/salon-1/slots?date=2024-05-20&serviceId=service-1
```

### Test 3.2: Test Frontend

Go to http://localhost:3000

**Student Flow:**
1. Click "Book Now" button
2. You should see list of salons (data from backend)
3. Click on a salon
4. See services and prices
5. Select a service
6. Select a time slot
7. Enter details
8. Book appointment
9. Get confirmation with booking ID

**Owner Flow:**
1. Click menu (hamburger icon) → "Owner Login"
2. Enter phone: `9876543210`
3. Enter PIN: `1234`
4. See dashboard with bookings
5. Click "Manage Slots"
6. Enable/disable slots for different dates

### Test 3.3: Verify Database Connection

In STS, open Database Connection:

1. **Window → Show View → Other**
2. **Search for "Database"**
3. **Select "Data Source Explorer"**
4. **Right-click → New Connection Profile**
5. **Enter your Supabase credentials**

You should see:
- Database connection successful
- Tables appear (users, salons, bookings, etc.)

---

## PART 4: COMMON ISSUES & FIXES

### Issue 1: "Cannot connect to localhost:8080"

**Solutions:**
```bash
# Check if port 8080 is already in use
# Mac/Linux:
lsof -i :8080

# Windows:
netstat -ano | findstr :8080

# Kill the process using that port, or
# Change port in application.yml:
server:
  port: 8081
```

### Issue 2: "Database connection failed"

**Solutions:**
1. Check Supabase credentials are correct
2. Make sure your IP is whitelisted in Supabase
   - Supabase → Settings → Database → Whitelist
   - Add your IP or 0.0.0.0/0 (less secure)
3. Try direct connection first:
   ```bash
   psql postgresql://postgres:password@host:5432/postgres
   ```

### Issue 3: "Frontend cannot reach backend"

**Solutions:**
```bash
# Test if backend is running
curl http://localhost:8080/api/salons

# Should return JSON data

# If not, restart backend:
# In STS: Stop and restart Spring Boot app
```

### Issue 4: "pnpm install stuck"

**Solutions:**
```bash
# Clear cache and retry
pnpm store prune
pnpm install

# Or use npm instead:
npm install
npm run dev
```

### Issue 5: "Migrations not running"

**Solutions:**
```bash
# Check migration files exist:
ls slotcut-backend/src/main/resources/db/migration/

# Should show:
# V1__Initial_Schema.sql
# V2__Add_Sample_Data.sql
# V3__Add_JWT_Token_Table.sql
# V4__Add_Rating_and_Reviews.sql
# V5__Add_Email_Notifications.sql

# If missing, extract files from the archive again
```

---

## PART 5: COMPLETE LOCAL TESTING CHECKLIST

Follow this checklist to test everything:

### Frontend Testing
- [ ] Landing page loads (dark theme, saffron buttons)
- [ ] Can click "Book Now"
- [ ] Salon list appears with 2 salons
- [ ] Can search salons
- [ ] Can click on a salon
- [ ] Can see services and pricing
- [ ] Can select a service
- [ ] Can see available time slots
- [ ] Can select a time slot
- [ ] Can enter name and phone
- [ ] Can complete booking
- [ ] Get confirmation with booking ID

### Owner Dashboard Testing
- [ ] Click menu → Owner Login
- [ ] Enter phone: `9876543210`
- [ ] Enter PIN: `1234`
- [ ] Dashboard loads
- [ ] See today's bookings
- [ ] See booking metrics/chart
- [ ] Click "Manage Slots"
- [ ] Can toggle slots on/off
- [ ] Can see different dates

### Backend API Testing
- [ ] GET `/api/salons` returns data
- [ ] GET `/api/salons/{id}` returns salon
- [ ] GET `/api/salons/{id}/slots` returns slots
- [ ] POST `/api/bookings` creates booking
- [ ] POST `/api/auth/login` authenticates owner
- [ ] All responses have proper HTTP status codes

### Database Testing
- [ ] Can connect to Supabase
- [ ] All 8 tables exist
- [ ] Tables have sample data
- [ ] Foreign keys are working
- [ ] Can query data directly

---

## PART 6: STOPPING & RESTARTING

### To Stop Frontend
```bash
# In VS Code terminal
Ctrl + C
```

### To Stop Backend
```bash
# In STS, click red square (Stop) button
# Or in terminal: Ctrl + C
```

### To Restart Everything
```bash
# Terminal 1: Frontend
cd /path/to/slotcut-app
pnpm dev

# Terminal 2: Backend (in STS or separate terminal)
cd slotcut-backend
./gradlew bootRun

# Database: Already running on Supabase (no restart needed)
```

---

## PART 7: DEBUGGING TIPS

### View Frontend Logs
```bash
# In VS Code terminal
# Logs appear automatically when you run: pnpm dev
# Check for errors in the output
```

### View Backend Logs
```bash
# In STS console
# Logs appear automatically when Spring Boot starts
# Look for ERROR or WARNING messages
```

### Check Network Requests
```bash
# In frontend (Chrome DevTools)
F12 → Network tab
# Perform an action
# Look for API calls to http://localhost:8080
# Check response status and data
```

### Test API Directly
```bash
# Using curl or Postman
curl -X GET http://localhost:8080/api/salons -H "Content-Type: application/json"

# Should return JSON with salon data
```

---

## PART 8: VERIFY EVERYTHING WORKS

When everything is running, you should see:

**VS Code Terminal:**
```
✓ Ready in 2.1s
  http://localhost:3000
```

**STS Console:**
```
Tomcat started on port(s): 8080
Started SlotcutApplication in 3.2 seconds
```

**Browser (http://localhost:3000):**
```
SlotCut - Salon Booking App
Dark theme with saffron orange buttons visible
"Book Now" button clickable
```

**Backend Test (curl):**
```
curl http://localhost:8080/api/salons
[{"id":"salon-1","name":"Prime Salon",...}]
```

---

## NEXT STEPS

Once everything is working locally:

1. ✅ **Take screenshots** of:
   - Frontend landing page
   - Complete booking flow
   - Owner dashboard
   - Backend API response

2. ✅ **Share with me** what you can successfully do

3. ✅ **Report any issues** you encounter

Then we move to **ONLINE DEPLOYMENT**:
- Database: Run migrations on Supabase
- Backend: Deploy to Railway
- Frontend: Deploy to Vercel
- Connect everything together

---

## QUICK REFERENCE

```bash
# Frontend
cd /path/to/slotcut-app
pnpm install     # First time only
pnpm dev         # Start development server
pnpm build       # Build for production
pnpm lint        # Check for errors

# Backend
cd slotcut-backend
./gradlew build           # Build project
./gradlew bootRun         # Run locally
./gradlew flywayMigrate   # Run migrations

# Database
# Use Supabase console at: https://supabase.com/dashboard
```

---

## TROUBLESHOOTING QUICK LINKS

- **Port already in use:** Change port in `application.yml` or `.env.local`
- **Cannot connect to database:** Check IP whitelist in Supabase
- **Frontend can't reach backend:** Check CORS and API URL in `.env.local`
- **Migrations failing:** Run SQL files manually in Supabase console
- **Dependencies not installing:** Clear cache: `pnpm store prune`

---

**READY TO START?**

1. Follow Parts 1-2 to set up frontend and backend
2. Follow Part 3 to test everything
3. Use Part 4-8 if you encounter issues
4. Come back when everything is working locally!

Let me know when you have:
- ✅ Frontend running on http://localhost:3000
- ✅ Backend running on http://localhost:8080
- ✅ Database connected to Supabase
- ✅ Can complete a full booking flow

Then we deploy live! 🚀
