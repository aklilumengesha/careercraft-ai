# CareerCraft AI 🚀

AI-powered career development platform for creating professional resumes, practicing interviews, and generating cover letters.

## Features

- **AI Resume Builder** - ATS-optimized resumes tailored to job descriptions
- **Interview Practice** - AI-powered questions with real-time feedback
- **Cover Letter Generator** - Personalized cover letters for any position
- **Career Dashboard** - Track progress and manage career materials
- **15+ Industries** - Specialized guidance across multiple sectors

## Tech Stack

- Next.js 15 (App Router)
- Clerk (Authentication)
- PostgreSQL + Prisma ORM
- Google Gemini AI
- Tailwind CSS + Shadcn UI

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Clerk account
- Google Gemini API key

### Installation

```bash
# Clone and install
git clone <repo-url>
cd careercraft-ai
npm install

# Setup environment
cp .env.example .env
# Add your credentials to .env

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/careercraft_ai"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
GEMINI_API_KEY=your_gemini_api_key
```

## Project Structure

```
careercraft-ai/
├── app/              # Next.js pages (dashboard, resume, interview, cover-letter)
├── actions/          # Server actions (user, resume, interview, cover-letter)
├── components/       # React components + Shadcn UI
├── data/            # Static data (features, industries, FAQs)
├── lib/             # Utilities (Prisma client, helpers)
└── prisma/          # Database schema
```

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npx prisma studio    # Database GUI
```

## Deployment

Deploy to Vercel:
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## License

MIT License

---

**Developed by [Aklilu Mengesha](mailto:aklilumengesha57@gmail.com)**
