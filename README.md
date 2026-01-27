# CareerCraft AI 🚀

![CareerCraft AI](https://img.shields.io/badge/CareerCraft-AI-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-15-black)

AI-powered career development platform that helps you create professional resumes, prepare for interviews, and get personalized career guidance.

## Features ✨

- **AI Resume Builder** - Generate ATS-optimized resumes tailored to specific jobs
- **Interview Practice** - Get AI-powered interview questions and real-time feedback
- **Cover Letter Generator** - Create personalized cover letters for any position
- **Career Dashboard** - Track your progress and manage all your career materials
- **Industry Insights** - Access 15+ industries with specialized guidance
- **Smart Recommendations** - Receive personalized career advice powered by AI

## Tech Stack 🛠️

- **Framework:** Next.js 15 (App Router)
- **Authentication:** Clerk
- **Database:** PostgreSQL with Prisma ORM
- **AI:** Google Gemini AI
- **Styling:** Tailwind CSS + Shadcn UI
- **Language:** JavaScript

## Quick Start 🏁

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or use Neon/Supabase)
- Clerk account (for authentication)
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd careercraft-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - From Clerk Dashboard
- `CLERK_SECRET_KEY` - From Clerk Dashboard
- `GEMINI_API_KEY` - From Google AI Studio

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

📖 **For detailed setup instructions, see [SETUP.md](./SETUP.md)**

## Environment Variables 🔐

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/careercraft_ai"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Project Structure 📁

```
careercraft-ai/
├── app/                      # Next.js app router pages
│   ├── dashboard/           # User dashboard
│   ├── resume/              # Resume builder pages
│   ├── interview/           # Interview practice pages
│   └── cover-letter/        # Cover letter generator pages
├── actions/                 # Server actions
│   ├── user.js             # User management
│   ├── resume.js           # Resume operations
│   ├── interview.js        # Interview operations
│   └── cover-letter.js     # Cover letter operations
├── components/              # React components
│   ├── ui/                 # Shadcn UI components
│   ├── header.jsx          # Navigation header
│   └── footer.jsx          # Footer
├── data/                    # Static data
│   ├── features.js         # Platform features
│   ├── industries.js       # Industry data
│   └── faqs.js            # FAQ content
├── lib/                     # Utility functions
│   ├── prisma.js           # Prisma client
│   └── utils.js            # Helper functions
└── prisma/                  # Database schema
    └── schema.prisma       # Prisma schema
```

## Scripts 📜

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema to database
```

## API Keys Setup 🔑

### Clerk (Authentication)
1. Go to [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the API keys from the dashboard
4. Add to `.env` file

### Google Gemini AI
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `.env` as `GEMINI_API_KEY`

### Database
Use a managed PostgreSQL service:
- [Neon](https://neon.tech) (Recommended - Free tier)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

## Deployment 🚢

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

The app will be live at your Vercel URL!

## Features Overview 🎯

### Resume Builder
- AI-generated content based on job descriptions
- ATS optimization
- Multiple industry templates
- Export to PDF

### Interview Practice
- Role-specific questions
- Real-time AI feedback
- Progress tracking
- Improvement suggestions

### Cover Letter Generator
- Personalized to job and company
- Professional formatting
- AI-powered content
- Easy editing and export

### Dashboard
- Track all your career materials
- View progress and stats
- Quick access to all features
- Recent activity feed

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

For support, open an issue on GitHub or contact the maintainers.

## Acknowledgments 🙏

- [Next.js](https://nextjs.org) - React framework
- [Clerk](https://clerk.com) - Authentication
- [Prisma](https://prisma.io) - Database ORM
- [Google Gemini AI](https://ai.google.dev) - AI capabilities
- [Shadcn UI](https://ui.shadcn.com) - UI components
- [Tailwind CSS](https://tailwindcss.com) - Styling

---

**Built with ❤️ for career growth**
