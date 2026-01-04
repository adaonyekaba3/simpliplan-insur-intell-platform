#!/bin/bash

# Script to set up Vercel environment variables
# Run this after: vercel login && vercel link

echo "Setting up Vercel environment variables..."

# Set environment variables for production
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production

# Optional: Set for preview environments
echo ""
echo "Do you want to set environment variables for preview deployments? (y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    vercel env add DATABASE_URL preview
    vercel env add NEXTAUTH_SECRET preview
    vercel env add NEXTAUTH_URL preview
    vercel env add GOOGLE_CLIENT_ID preview
    vercel env add GOOGLE_CLIENT_SECRET preview
    vercel env add STRIPE_SECRET_KEY preview
    vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY preview
    vercel env add STRIPE_WEBHOOK_SECRET preview
fi

echo ""
echo "Environment variables setup complete!"
echo "Next steps:"
echo "1. Run 'vercel --prod' to deploy to production"
echo "2. Set up Stripe webhook in dashboard with your production URL"
