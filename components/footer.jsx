import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-muted/30 to-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <BriefcaseBusiness className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="font-bold text-xl group-hover:text-primary transition-colors duration-300">CareerCraft AI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered career development platform to help you land your dream
              job.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/interview" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Interview Prep
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} CareerCraft AI. All rights reserved.
          </p>
          <p className="mt-2">
            Developed by{" "}
            <a 
              href="mailto:aklilumengesha57@gmail.com" 
              className="text-primary hover:underline transition-all duration-300 hover:text-primary/80"
            >
              Aklilu Mengesha
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
