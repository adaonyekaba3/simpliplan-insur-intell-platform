# Google OAuth Setup for Production

## Problem
Google OAuth login/registration not working in production deployment.

## Solution

### Step 1: Add Environment Variables in Vercel

1. Go to: https://vercel.com/ada-onyekabas-projects/simpliplan-insur-intell-platform/settings/environment-variables

2. Click **Add New**

3. Add each of these variables (select **Production**, **Preview**, and **Development**):

| Variable Name | Value |
|---------------|-------|
| `NEXTAUTH_SECRET` | Copy from your `.env.local` file |
| `NEXTAUTH_URL` | `https://simpliplan-insur-intell-platform-gjr4nopvg.vercel.app` |
| `GOOGLE_CLIENT_ID` | Copy from your `.env.local` file |
| `GOOGLE_CLIENT_SECRET` | Copy from your `.env.local` file |

**Important**: Make sure to select all three environments (Production, Preview, Development) when adding each variable.

### Step 2: Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)

2. Select your project

3. Navigate to **APIs & Services** → **Credentials**

4. Find and click on your OAuth 2.0 Client ID
   - Look for the Client ID that matches the one in your `.env.local` file

5. Scroll down to **Authorized redirect URIs**

6. Click **+ ADD URI**

7. Add this URL:
   ```
   https://simpliplan-insur-intell-platform-gjr4nopvg.vercel.app/api/auth/callback/google
   ```

8. Your redirect URIs should now include:
   - ✅ `http://localhost:3000/api/auth/callback/google` (for local development)
   - ✅ `https://simpliplan-insur-intell-platform-gjr4nopvg.vercel.app/api/auth/callback/google` (for production)

9. Click **SAVE**

### Step 3: Redeploy (Already Done)

A new deployment has been triggered. Wait for it to complete.

### Step 4: Test

Once the deployment completes:

1. Visit: https://simpliplan-insur-intell-platform-gjr4nopvg.vercel.app
2. Click on "Login" or "Sign Up"
3. Try signing in with Google
4. It should now work!

## Common Issues

### "Redirect URI Mismatch" Error
- **Cause**: Google OAuth redirect URI not configured
- **Fix**: Make sure you added the production callback URL in Google Cloud Console (Step 2)

### "Configuration Error" or "Server Error"
- **Cause**: Missing environment variables in Vercel
- **Fix**: Check that all environment variables are added in Vercel (Step 1)

### "Invalid Client" Error
- **Cause**: Wrong `GOOGLE_CLIENT_ID` or `GOOGLE_CLIENT_SECRET`
- **Fix**: Verify the credentials match what's in Google Cloud Console

### Still Not Working?
1. Check Vercel deployment logs for errors
2. Verify environment variables are set in Vercel dashboard
3. Make sure Google OAuth redirect URIs are saved
4. Try clearing browser cache and cookies
5. Check that NEXTAUTH_URL matches your production domain exactly

## Verification Checklist

- [ ] Added `NEXTAUTH_SECRET` to Vercel
- [ ] Added `NEXTAUTH_URL` to Vercel (set to production URL)
- [ ] Added `GOOGLE_CLIENT_ID` to Vercel
- [ ] Added `GOOGLE_CLIENT_SECRET` to Vercel
- [ ] Added production redirect URI to Google Cloud Console
- [ ] Saved changes in Google Cloud Console
- [ ] Waited for Vercel deployment to complete
- [ ] Tested login on production site

## Production URLs

- **Production Site**: https://simpliplan-insur-intell-platform-gjr4nopvg.vercel.app
- **OAuth Callback**: https://simpliplan-insur-intell-platform-gjr4nopvg.vercel.app/api/auth/callback/google
- **Vercel Dashboard**: https://vercel.com/ada-onyekabas-projects/simpliplan-insur-intell-platform
