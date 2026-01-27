import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <BriefcaseBusiness className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">CareerCraft AI</span>
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
                <Link href="/#features" className="hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-primary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-primary">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/interview" className="hover:text-primary">
                  Interview Prep
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
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
        </div>
      </div>
    </footer>
  );
}
