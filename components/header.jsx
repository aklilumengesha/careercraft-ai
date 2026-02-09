"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BriefcaseBusiness, PenBox } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <BriefcaseBusiness className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
          <span className="font-bold text-xl group-hover:text-primary transition-colors duration-300">CareerCraft AI</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/#features"
            className="transition-all duration-300 hover:text-primary hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="transition-all duration-300 hover:text-primary hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            How It Works
          </Link>
          <Link 
            href="/#faqs" 
            className="transition-all duration-300 hover:text-primary hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            FAQs
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" className="transition-all duration-300 hover:scale-105 hover:shadow-md">Sign In</Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button className="group transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <PenBox className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" className="transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-primary/5">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
