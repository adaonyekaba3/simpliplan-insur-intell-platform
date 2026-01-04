# SimpliPlan Deployment Guide

## Prerequisites
- Vercel account ([sign up here](https://vercel.com/signup))
- Stripe account ([sign up here](https://stripe.com))
- Vercel CLI installed (already done)

## Step-by-Step Deployment

### 1. Login to Vercel
```bash
vercel login
```
Follow the browser prompt to authenticate.

### 2. Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** → **Create Database**
3. Select **Postgres**
4. Name: `simpliplan-db`
5. Choose your preferred region
6. Click **Create**

### 3. Get Database Connection String

After creating the database:
1. Click on your database in the Storage tab
2. Go to **Settings** or **Connect** tab
3. Copy the `DATABASE_URL` (format: `postgres://default:xxxxx@xxxx.postgres.vercel-storage.com:5432/verceldb`)

### 4. Update Local Environment

Update your `.env.local` with the Vercel Postgres URL:
```env
DATABASE_URL="postgres://default:xxxxx@xxxx.postgres.vercel-storage.com:5432/verceldb"
```

### 5. Run Database Migrations

Push your Prisma schema to the database:
```bash
npm run db:push
```

This will create all the necessary tables in your Vercel Postgres database.

### 6. Link Your Project to Vercel

```bash
vercel link
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No** (or **Yes** if you already created one)
- Project name? `simpliplan-insur-intell-platform` (or your preferred name)
- In which directory? `./` (current directory)

### 7. Set Up Environment Variables in Vercel

You have two options:

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Settings** → **Environment Variables**
3. Add each variable below for **Production**, **Preview**, and **Development**:

**Required Variables:**
```
DATABASE_URL=<your-vercel-postgres-url>
NEXTAUTH_SECRET=<copy from .env.local>
NEXTAUTH_URL=https://your-app-name.vercel.app
GOOGLE_CLIENT_ID=<copy from .env.local>
GOOGLE_CLIENT_SECRET=<copy from .env.local>
STRIPE_SECRET_KEY=<copy from .env.local>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<copy from .env.local>
STRIPE_WEBHOOK_SECRET=<see step 8 for production webhook secret>
```

#### Option B: Using CLI Script

Run the provided script (will prompt for each value):
```bash
./setup-vercel-env.sh
```

### 8. Deploy to Vercel

Deploy your application:
```bash
vercel --prod
```

This will build and deploy your app. Note the deployment URL (e.g., `https://simpliplan-insur-intell-platform.vercel.app`).

### 9. Set Up Production Stripe Webhook

After deployment, you need to create a webhook in Stripe Dashboard:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks)
2. Click **Add endpoint**
3. Endpoint URL: `https://your-app-name.vercel.app/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

### 10. Update Production Webhook Secret

Add the production webhook secret to Vercel:
```bash
vercel env add STRIPE_WEBHOOK_SECRET production
```
Paste the webhook secret from step 9.

Then redeploy:
```bash
vercel --prod
```

### 11. Update OAuth Redirect URIs

Update your Google OAuth settings:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add authorized redirect URI:
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   ```
5. Save

### 12. Verify Deployment

Test your deployment:
- Visit `https://your-app-name.vercel.app`
- Test authentication (Google OAuth)
- Test a purchase flow to verify Stripe webhooks

## Local Development with Vercel Postgres

If you want to use Vercel Postgres for local development:

1. Use the same `DATABASE_URL` in `.env.local`
2. Run migrations: `npm run db:push`
3. Start dev server: `npm run dev`

For local Stripe webhooks:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Useful Commands

```bash
# View Vercel environment variables
vercel env ls

# Pull environment variables to local
vercel env pull

# View deployment logs
vercel logs

# Open Prisma Studio to view database
npm run db:studio

# Check deployment status
vercel inspect <deployment-url>
```

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correctly set in Vercel environment variables
- Check that database is in the same region for better performance
- Run `npm run db:push` to ensure schema is synced

### Webhook Issues
- Verify `STRIPE_WEBHOOK_SECRET` matches your Stripe dashboard endpoint
- Check webhook endpoint is publicly accessible
- View webhook logs in Stripe Dashboard

### Build Failures
- Check Vercel deployment logs: `vercel logs`
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

## Next Steps

- Set up custom domain in Vercel Dashboard
- Enable Vercel Analytics
- Configure monitoring and error tracking
- Set up production Stripe keys when ready to go live
- Consider enabling Prisma Accelerate for better database performance
