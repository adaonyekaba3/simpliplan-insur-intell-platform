# SimpliPlan - AI-Powered Health Plan Comparison Platform

![SimpliPlan](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma)

SimpliPlan uses AI to analyze your healthcare needs and recommend the perfect health plan—in under 5 minutes.

## ✨ Features

- 🤖 **AI-Powered Recommendations** - Sophisticated algorithm analyzes your needs
- 📊 **Interactive Comparison Matrix** - Side-by-side plan comparison with color-coded insights
- 🧮 **Cost Calculator** - Personalized annual cost estimates based on your usage
- 📝 **Smart Questionnaire** - 6-step quiz to understand your healthcare needs
- 🔐 **Secure Authentication** - Google OAuth + Email/Password via NextAuth.js
- 💳 **Integrated POS System** - Purchase plans and services with Stripe
- 🎨 **Beautiful UI** - Modern, responsive design with Tailwind CSS
- 📈 **Data Visualization** - Charts and graphs using Recharts

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)
- (Optional) Google OAuth credentials
- (Optional) Stripe account for payments

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/simpliplan-insur-intell-platform.git
cd simpliplan-insur-intell-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - `http://localhost:3000` for development
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `STRIPE_SECRET_KEY` & `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - From Stripe Dashboard

4. **Initialize the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Start the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## 📁 Project Structure

```
simpliplan-insur-intell-platform/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── (app)/            # Protected app routes
│   │   │   ├── compare/      # Plan comparison matrix
│   │   │   ├── quiz/         # Health needs questionnaire
│   │   │   ├── results/      # AI recommendations
│   │   │   ├── calculator/   # Cost calculator
│   │   │   ├── life-events/  # Life event navigator
│   │   │   ├── pos/          # Point of sale system
│   │   │   └── layout.tsx    # App layout with sidebar
│   │   ├── (auth)/           # Authentication routes
│   │   │   ├── login/        # Login page
│   │   │   └── register/     # Registration page
│   │   ├── (marketing)/      # Public marketing pages
│   │   │   └── page.tsx      # Landing page
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth.js endpoints
│   │   │   └── stripe/       # Stripe payment endpoints
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   └── Providers.tsx     # Context providers
│   ├── hooks/
│   │   └── useStripe.ts      # Stripe utilities
│   └── lib/
│       ├── auth.ts           # NextAuth configuration
│       ├── prisma.ts         # Prisma client
│       ├── stripe.ts         # Stripe client
│       ├── plans.ts          # Mock health plan data
│       ├── products.ts       # POS product data
│       ├── recommendation.ts # AI recommendation algorithm
│       └── types.ts          # TypeScript interfaces
├── .env.example              # Environment variables template
├── .env.local               # Your local environment (gitignored)
└── package.json             # Dependencies and scripts
```

## 🔧 Configuration

### Database Options

**Local PostgreSQL:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/simpliplan"
```

**Vercel Postgres (Recommended):**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a Postgres database
3. Copy the connection string

**Supabase (Free Tier):**
1. Create a project at [Supabase](https://supabase.com)
2. Get connection string from Project Settings → Database

**Neon (Serverless):**
1. Create a project at [Neon](https://neon.tech)
2. Copy the connection string

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Navigate to **APIs & Services** → **Credentials**
4. Create **OAuth 2.0 Client ID**
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/google`

### Stripe Setup

1. Sign up at [Stripe](https://stripe.com)
2. Get API keys from [Dashboard](https://dashboard.stripe.com/test/apikeys)
3. For webhooks:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

## 🎯 Key Features Explained

### AI Recommendation Algorithm

The recommendation engine scores each health plan based on:
- **Cost (40%)** - Estimates your annual costs including premiums, copays, and procedures
- **Coverage Fit (30%)** - Matches plan features to your prescription and visit needs
- **Risk Alignment (20%)** - Aligns with your preference for predictable vs. lower costs
- **HSA Preference (10%)** - Considers your interest in Health Savings Accounts

### Plan Comparison Matrix

Visual comparison table with:
- Color-coded best/worst values (green = best, red = worst)
- Interactive tooltips explaining each metric
- Plan type badges (HMO, PPO, HDHP, EPO)

### Point of Sale System

Full-featured POS with:
- Product catalog with categories
- Shopping cart management
- Multiple payment methods (Stripe, Cash, Insurance)
- Transaction tracking

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub** (see below for Git setup)
2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "Import Project"
   - Select your repository
3. **Configure Environment Variables**
   - Add all variables from `.env.example` in Vercel settings
4. **Deploy!**
   - Vercel will automatically build and deploy

### Environment Variables for Production

In Vercel Dashboard → Settings → Environment Variables, add:
- `DATABASE_URL` - Your production database
- `NEXTAUTH_SECRET` - Same as local (generate new for production)
- `NEXTAUTH_URL` - Your production URL (e.g., `https://simpliplan.vercel.app`)
- `GOOGLE_CLIENT_ID` - Update redirect URIs in Google Console
- `GOOGLE_CLIENT_SECRET`
- `STRIPE_SECRET_KEY` - Use live keys for production
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET` - Create webhook in Stripe for production URL

## 📚 Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Charts:** Recharts
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 🧪 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Prisma commands
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema to database
npx prisma migrate dev  # Create and apply migrations
```

## 📖 Documentation

For more detailed documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Stripe Documentation](https://stripe.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Adaobi Onyekaba**

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
