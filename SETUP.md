# CareerCraft AI - Setup Guide

Complete step-by-step guide to get CareerCraft AI running locally.

## Step 1: Prerequisites

Make sure you have installed:
- **Node.js 18+** - [Download](https://nodejs.org)
- **Git** - [Download](https://git-scm.com)
- **PostgreSQL** (or use a cloud provider)

## Step 2: Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd careercraft-ai

# Install dependencies
npm install
```

## Step 3: Database Setup

### Option A: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database:
```sql
CREATE DATABASE careercraft_ai;
```
3. Your connection string will be:
```
postgresql://postgres:password@localhost:5432/careercraft_ai
```

### Option B: Cloud Database (Recommended)

**Using Neon (Free tier available):**
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string
4. It will look like:
```
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb
```

**Using Supabase:**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string (use "Connection pooling" for better performance)

## Step 4: Clerk Authentication Setup

1. Go to [clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Choose "Next.js" as your framework
4. In the Clerk Dashboard:
   - Go to "API Keys"
   - Copy the "Publishable Key" (starts with `pk_test_`)
   - Copy the "Secret Key" (starts with `sk_test_`)

## Step 5: Google Gemini AI Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key (starts with `AIzaSy`)

## Step 6: Environment Variables

1. Copy the example file:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in your values:
```env
# Database (from Step 3)
DATABASE_URL="postgresql://user:password@host:5432/database"

# Clerk (from Step 4)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Clerk URLs (keep these as is)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google Gemini (from Step 5)
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 7: Initialize Database

Run Prisma commands to set up your database:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push
```

You should see output like:
```
✔ Generated Prisma Client
Your database is now in sync with your Prisma schema.
```

## Step 8: Run the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 9: Test the Application

1. Click "Get Started" or "Sign In"
2. Create a new account using Clerk
3. You'll be redirected to the dashboard
4. Try creating a resume, interview practice, or cover letter

## Troubleshooting

### Database Connection Issues

**Error: Can't reach database server**
- Check your `DATABASE_URL` is correct
- Make sure your database is running (if local)
- Check firewall settings (if cloud)

**Solution:**
```bash
# Test connection
npx prisma db push
```

### Clerk Authentication Issues

**Error: Clerk publishable key not found**
- Make sure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is in `.env`
- Restart the dev server after adding env variables

**Solution:**
```bash
# Stop server (Ctrl+C) and restart
npm run dev
```

### Gemini AI Issues

**Error: API key not valid**
- Check your `GEMINI_API_KEY` in `.env`
- Make sure you copied the full key
- Verify the key is active in Google AI Studio

### Port Already in Use

**Error: Port 3000 is already in use**

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

## Viewing the Database

To view and edit your database:

```bash
npx prisma studio
```

This opens a GUI at [http://localhost:5555](http://localhost:5555)

## Production Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add all environment variables from `.env`
5. Deploy

### Important for Production

- Use a production database (not local)
- Update `NEXT_PUBLIC_APP_URL` to your domain
- Keep your API keys secure
- Never commit `.env` to Git

## Next Steps

- Customize the landing page
- Add more industries in `data/industries.js`
- Modify AI prompts in `actions/` files
- Add more features!

## Need Help?

- Check the [README.md](./README.md) for more info
- Open an issue on GitHub
- Review Prisma docs: [prisma.io/docs](https://prisma.io/docs)
- Review Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

Happy coding! 🚀
