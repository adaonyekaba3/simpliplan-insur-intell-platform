# Database Setup for Production

## Problem
User registration is failing with "Registration Failed" error because the database is not properly configured.

## Root Causes
1. **Missing DATABASE_URL** - Environment variable not set in Vercel
2. **No database tables** - Prisma schema not deployed to production database

## Solution

### Step 1: Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Configure:
   - **Name**: `simpliplan-db`
   - **Region**: Choose closest to your users (e.g., `us-east-1`)
6. Click **Create**

### Step 2: Get Database Connection String

After creating the database:

1. In Vercel Storage, click on your `simpliplan-db` database
2. Go to **Settings** or **Quickstart** tab
3. Look for **Connection String** section
4. Copy the `DATABASE_URL` value (starts with `postgres://`)

Example format:
```
postgres://default:xxxxx@xxxx-xxxx-xxxx.us-east-1.postgres.vercel-storage.com:5432/verceldb
```

### Step 3: Add DATABASE_URL to Vercel

1. Go to your project: https://vercel.com/ada-onyekabas-projects/simpliplan-insur-intell-platform/settings/environment-variables

2. Click **Add New**

3. Add the database URL:
   - **Name**: `DATABASE_URL`
   - **Value**: Paste the connection string from Step 2
   - **Environments**: Select **Production**, **Preview**, and **Development**

4. Click **Save**

### Step 4: Connect Vercel Postgres to Your Project (Important!)

This is the easiest way to automatically add DATABASE_URL:

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **Connect Store**
3. Select your `simpliplan-db` Postgres database
4. Click **Connect**

This will automatically:
- Add `DATABASE_URL` environment variable
- Add other Postgres-related variables
- Link the database to your project

### Step 5: Deploy Database Schema

You need to push your Prisma schema to the production database. You have two options:

#### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI if not already installed:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Link your project:
   ```bash
   vercel link
   ```

4. Pull environment variables (including DATABASE_URL):
   ```bash
   vercel env pull .env.production
   ```

5. Deploy the schema to production database:
   ```bash
   DATABASE_URL="<your-production-database-url>" npx prisma db push
   ```

#### Option B: Using Vercel Web Interface

1. Go to your Vercel project dashboard
2. Click on **Settings** → **General**
3. Scroll to **Build & Development Settings**
4. Add to **Install Command**:
   ```bash
   npm install && npx prisma generate && npx prisma db push --accept-data-loss
   ```

5. Trigger a new deployment (push to GitHub or use Vercel dashboard)

**Note**: This will automatically run migrations on each deployment.

### Step 6: Verify Database Setup

After deploying the schema, verify the tables exist:

1. In Vercel Dashboard, go to **Storage** → Your database
2. Click **Query** or **Data** tab
3. You should see these tables:
   - `Account`
   - `Session`
   - `User`
   - `VerificationToken`
   - `Product`
   - `CartItem`
   - `Transaction`
   - `TransactionItem`

### Step 7: Redeploy Your Application

Trigger a new deployment to apply all changes:

```bash
git commit --allow-empty -m "Redeploy with database configured"
git push origin main
```

Or use Vercel dashboard: **Deployments** → **Redeploy**

### Step 8: Test Registration

1. Visit: https://simpliplan-insur-intell-platform-gjr4nopvg.vercel.app/register
2. Fill out the registration form
3. Click "Create Account"
4. Registration should now work!

## Quick Fix (Fastest Method)

1. Go to Vercel project → **Storage** → **Connect Store**
2. Select your Postgres database → **Connect**
3. This automatically adds `DATABASE_URL`
4. Run locally with production URL:
   ```bash
   # Update .env.local with production DATABASE_URL from Vercel
   npm run db:push
   ```
5. Push empty commit to redeploy:
   ```bash
   git commit --allow-empty -m "Trigger redeploy" && git push
   ```

## Troubleshooting

### Error: "Prisma Client not found"
**Solution**: Make sure `postinstall` script runs:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Error: "Table 'User' does not exist"
**Solution**: Run `npx prisma db push` with production DATABASE_URL

### Error: "Can't reach database server"
**Solution**: Check DATABASE_URL is correct in Vercel environment variables

### Error: "SSL connection required"
**Solution**: Add `?sslmode=require` to your DATABASE_URL if using external database

## Environment Variables Checklist

Make sure these are set in Vercel:

- [ ] `DATABASE_URL` - From Vercel Postgres or your database provider
- [ ] `NEXTAUTH_SECRET` - Copy from .env.local
- [ ] `NEXTAUTH_URL` - Set to production URL
- [ ] `GOOGLE_CLIENT_ID` - Copy from .env.local
- [ ] `GOOGLE_CLIENT_SECRET` - Copy from .env.local
- [ ] `STRIPE_SECRET_KEY` - Copy from .env.local
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Copy from .env.local
- [ ] `STRIPE_WEBHOOK_SECRET` - Get from production Stripe webhook

## Current Status

- ✅ Improved error handling in registration API
- ⏳ DATABASE_URL needs to be added to Vercel
- ⏳ Database schema needs to be deployed
- ⏳ Registration needs testing after database setup

## Additional Resources

- [Vercel Postgres Quickstart](https://vercel.com/docs/storage/vercel-postgres/quickstart)
- [Prisma with Vercel Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
