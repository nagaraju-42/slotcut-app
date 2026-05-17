# SLOTCUT - YOUR COMPLETE ACTION PLAN
## Step-by-Step Deployment Guide with All Links & Instructions

---

## 🎯 PHASE 1: SETUP (15 minutes)

### STEP 1: Create GitHub Repository
**What you need to do:**
1. Go to https://github.com/new
2. Create a new repository named: `slotcut-app`
3. Set it to PUBLIC (for easier deployment)
4. Click "Create Repository"

**What to give me:**
- Your GitHub repository URL (Example: `https://github.com/your-username/slotcut-app`)

---

### STEP 2: Push Code to GitHub
**What you need to do:**

On your local machine, run these commands:

```bash
# Navigate to the project folder
cd /path/to/slotcut-app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: SlotCut full-stack application"

# Add remote repository (replace with YOUR repo URL)
git remote add origin https://github.com/YOUR-USERNAME/slotcut-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**What to give me:**
- Confirmation that code is pushed to GitHub
- Screenshot showing commits in your GitHub repo

---

## 🌐 PHASE 2: FRONTEND DEPLOYMENT (10 minutes)

### STEP 3: Deploy Frontend to Vercel
**What you need to do:**

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Sign Up" (or log in if you have account)
   - Connect with GitHub
   - Click "Continue"

2. **Import Project:**
   - Click "Import Project"
   - Select "Import Git Repository"
   - Paste your GitHub URL: `https://github.com/YOUR-USERNAME/slotcut-app`
   - Click "Continue"

3. **Configure Project:**
   - Project name: `slotcut-frontend` (or any name you prefer)
   - Framework: Select "Next.js" (it should auto-detect)
   - Click "Deploy"
   - **Wait 2-3 minutes for deployment** ⏳

4. **Get Your Frontend URL:**
   - After deployment, you'll see a URL like: `https://slotcut-frontend-xxx.vercel.app`
   - This is your frontend URL

**What to give me:**
- Your Vercel frontend URL (Example: `https://slotcut-frontend-abc123.vercel.app`)
- Screenshot of "Deployment Successful" page

**Your Frontend is now LIVE!** ✅

---

## 🔧 PHASE 3: DATABASE SETUP (10 minutes)

### STEP 4: Create Supabase Database
**What you need to do:**

1. **Create Supabase Account:**
   - Go to https://supabase.com
   - Click "Sign Up" 
   - Use GitHub to sign up (recommended)
   - Verify email

2. **Create New Project:**
   - Click "New Project"
   - Project name: `slotcut-db`
   - Database password: Create a STRONG password (save this!)
   - Region: Choose closest to you
   - Click "Create new project"
   - **Wait 2-3 minutes** for database to initialize ⏳

3. **Get Connection Credentials:**
   - Once created, go to Project Settings
   - Click "Database"
   - Copy these values (you'll need them):
     - **Host**: `xxxxx.supabase.co`
     - **Port**: `5432`
     - **Database**: `postgres`
     - **Username**: `postgres`
     - **Password**: (the one you created)

4. **Run Database Migrations:**
   - Go to SQL Editor in Supabase
   - Copy and paste the contents of these files, one by one:
     - `slotcut-backend/src/main/resources/db/migration/V1__Initial_Schema.sql`
     - `slotcut-backend/src/main/resources/db/migration/V2__Add_Sample_Data.sql`
     - `slotcut-backend/src/main/resources/db/migration/V3__Add_JWT_Token_Table.sql`
     - `slotcut-backend/src/main/resources/db/migration/V4__Add_Rating_and_Reviews.sql`
     - `slotcut-backend/src/main/resources/db/migration/V5__Add_Email_Notifications.sql`
   - Click "Run" for each one
   - **Wait until all complete** ✅

**What to give me:**
- Your Supabase connection credentials:
  ```
  Host: xxxxx.supabase.co
  Port: 5432
  Database: postgres
  Username: postgres
  Password: (your-secure-password)
  ```
- Screenshot showing database tables created in Supabase
- Connection string format: `postgresql://postgres:[PASSWORD]@xxxxx.supabase.co:5432/postgres`

**Your Database is now READY!** ✅

---

## 🚀 PHASE 4: BACKEND DEPLOYMENT (15 minutes)

### STEP 5: Deploy Backend to Railway
**What you need to do:**

1. **Create Railway Account:**
   - Go to https://railway.app
   - Click "Login with GitHub"
   - Authorize Railway to access your GitHub
   - Click "Create Account"

2. **Create New Project:**
   - Go to https://railway.app/dashboard
   - Click "+ New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `slotcut-app` repository
   - Click "Connect"

3. **Configure Build:**
   - Click on your project
   - Add a service:
     - Click "Add Service"
     - Select "GitHub repo"
     - Configure build:
       - **Root Directory**: `slotcut-backend`
       - **Build Command**: `./gradlew build`
       - **Start Command**: `java -jar build/libs/slotcut-backend-0.0.1-SNAPSHOT.jar`

4. **Add Environment Variables:**
   - Go to Variables section
   - Add these variables:
     ```
     SPRING_DATASOURCE_URL=jdbc:postgresql://HOST:5432/postgres
     SPRING_DATASOURCE_USERNAME=postgres
     SPRING_DATASOURCE_PASSWORD=YOUR_PASSWORD
     JWT_SECRET=your-secret-key-min-32-characters-long
     SPRING_JPA_HIBERNATE_DDL_AUTO=validate
     ```
     (Replace with your Supabase credentials)

5. **Deploy:**
   - Click "Deploy"
   - **Wait 5-7 minutes for build** ⏳
   - Once complete, you'll get a URL like: `https://slotcut-backend-xxx.railway.app`

**What to give me:**
- Your Railway backend URL (Example: `https://slotcut-backend-abc123.railway.app`)
- Screenshot of "Deployment Successful"
- All environment variables you set

**Your Backend is now LIVE!** ✅

---

## 🔗 PHASE 5: CONNECT EVERYTHING (10 minutes)

### STEP 6: Update Frontend Environment Variables
**What you need to do:**

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Click on your `slotcut-frontend` project

2. **Set Environment Variables:**
   - Go to "Settings" tab
   - Click "Environment Variables"
   - Add this variable:
     ```
     NEXT_PUBLIC_API_URL=https://YOUR-RAILWAY-BACKEND-URL
     ```
     (Example: `https://slotcut-backend-abc123.railway.app`)
   - Click "Save"

3. **Redeploy Frontend:**
   - Go back to "Deployments" tab
   - Click the three dots on latest deployment
   - Select "Redeploy"
   - **Wait 2-3 minutes** ⏳

**What to give me:**
- Screenshot showing environment variable set in Vercel
- Confirmation that frontend has redeployed

---

### STEP 7: Test All Connections
**What you need to do:**

1. **Test Frontend:**
   - Open your Vercel URL in browser
   - You should see the SlotCut landing page
   - Click "Book Now" → should show list of salons

2. **Test Backend API:**
   - Open in browser: `YOUR-RAILWAY-URL/api/salons`
   - Should see JSON response with salons list

3. **Test Authentication:**
   - Go to frontend owner login page
   - Try logging in with any phone number and PIN `1234`
   - Should redirect to dashboard

**What to give me:**
- Screenshots of:
  1. Frontend home page
  2. Salon list page
  3. Backend API response (JSON)
  4. Owner dashboard after login
  5. Any errors you see (if any)

---

## 📊 PHASE 6: FINAL VERIFICATION (5 minutes)

### STEP 8: Full System Test
**What you need to do:**

1. **Test Complete Booking Flow:**
   - Go to frontend URL
   - Click "Book Now"
   - Select a salon
   - Select a service
   - Select a slot
   - Enter your name and email
   - Complete booking
   - **Screenshot the confirmation page**

2. **Test Owner Dashboard:**
   - Go to frontend URL
   - Click menu (hamburger icon)
   - Click "Owner Login"
   - Phone: `9876543210`
   - PIN: `1234`
   - Should see dashboard with bookings
   - **Screenshot the dashboard**

3. **Check Database:**
   - Go to Supabase dashboard
   - Go to SQL Editor
   - Run: `SELECT * FROM bookings;`
   - Should see your test booking
   - **Screenshot the results**

**What to give me:**
- Screenshots of:
  1. Complete booking confirmation
  2. Owner dashboard
  3. Database table with bookings
  4. All three URLs (frontend, backend, database)

---

## ✅ PHASE 7: GOING LIVE (Final Step)

### STEP 9: Domain Setup (OPTIONAL - but recommended)
**What you need to do:**

1. **Buy Domain (if you don't have one):**
   - Go to Namecheap.com or GoDaddy.com
   - Search for domain: `slotcut.com` or `your-salon-name.com`
   - Buy it (~$10/year)

2. **Connect Domain to Vercel:**
   - Go to Vercel project settings
   - Click "Domains"
   - Enter your domain name
   - Follow instructions to add DNS records
   - **Wait 24-48 hours for DNS to propagate**

3. **Update Frontend URL:**
   - Add your custom domain URL to Supabase environment

**What to give me:**
- Your custom domain URL (or confirm you want to use Vercel URL)
- Screenshot of domain connected in Vercel

---

## 🎉 YOU'RE LIVE!

Once all steps are complete, you have:

✅ **Frontend** - Running on Vercel
✅ **Backend** - Running on Railway  
✅ **Database** - Running on Supabase
✅ **All Connected** - Everything talks to each other
✅ **Live Application** - Accessible to anyone on the internet

**Your URLs:**
- Frontend: `https://YOUR-FRONTEND-URL.vercel.app`
- Backend API: `https://YOUR-BACKEND-URL.railway.app`
- Database: Supabase (internal)

---

## 📋 CHECKLIST - What You Need to Provide Me at Each Step

### After STEP 2:
- [ ] GitHub repository URL
- [ ] Screenshot of code pushed to GitHub

### After STEP 3:
- [ ] Vercel frontend URL
- [ ] Screenshot of deployment success

### After STEP 4:
- [ ] Supabase credentials (host, user, password)
- [ ] Connection string
- [ ] Screenshot of database tables created

### After STEP 5:
- [ ] Railway backend URL
- [ ] Screenshot of deployment success
- [ ] Environment variables used

### After STEP 6:
- [ ] Screenshot of environment variable in Vercel
- [ ] Confirmation of redeployment

### After STEP 7:
- [ ] Screenshots of testing (frontend, backend API, login, dashboard)

### After STEP 8:
- [ ] Screenshot of booking confirmation
- [ ] Screenshot of owner dashboard
- [ ] Screenshot of database with booking data

### After STEP 9 (if doing custom domain):
- [ ] Custom domain URL

---

## 🆘 COMMON ISSUES & FIXES

### "Database connection failed"
**Solution:**
- Check credentials are correct in Railway
- Verify Supabase database is running
- Check firewall isn't blocking port 5432

### "CORS error when frontend calls backend"
**Solution:**
- Add to backend: `@CrossOrigin("*")` on controllers
- Or add CORS configuration in Spring Security

### "Backend deployed but getting 503 error"
**Solution:**
- Check build logs in Railway
- Verify environment variables are set
- Check Java version matches (17+)

### "Migration errors in Supabase"
**Solution:**
- Check for syntax errors in SQL
- Run migrations in order (V1, then V2, then V3, etc.)
- Check table already doesn't exist

---

## ⏱️ TIME ESTIMATE

- STEP 1-2: 5 min
- STEP 3: 5 min + 3 min wait = 8 min
- STEP 4: 5 min + 3 min wait = 8 min
- STEP 5: 5 min + 7 min wait = 12 min
- STEP 6: 3 min + 2 min wait = 5 min
- STEP 7: 5 min
- STEP 8: 5 min
- STEP 9: 5 min (+ 24-48 hours for DNS)

**Total Active Time: ~45 minutes**
**Total with Waiting: ~60 minutes**
**Going Live: 1 hour**

---

## 💬 NEXT ACTION

**You should now:**

1. ✅ Start with STEP 1 (Create GitHub repo)
2. ✅ Give me the GitHub URL
3. ✅ Move to STEP 2 (Push code)
4. ✅ Continue following the steps in order
5. ✅ Share progress/screenshots with me

I'll monitor each step and help you troubleshoot any issues.

**Are you ready to start? Let me know when you complete STEP 1!**

---

## 📞 How to Share Information with Me

When you complete a step, send me:

```
STEP X COMPLETE:
- [What you did]
- URLs/Links: [copy paste here]
- Credentials: [if needed]
- Screenshots: [paste images]
- Any errors: [describe]
```

Example:
```
STEP 3 COMPLETE:
- Created Vercel project
- Frontend URL: https://slotcut-frontend-xyz.vercel.app
- Deployment took 3 minutes
- No errors
- [screenshot attached]
```

This way I can track progress and jump in to help immediately if needed!

---

**LET'S GET THIS LIVE! 🚀**
