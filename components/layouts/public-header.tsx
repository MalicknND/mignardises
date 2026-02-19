'use client';

import { useEffect, useState } from "react";
import { projectConfig } from "@/config/project";

import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle"

const LINKS = [
  { href: '/features', label: 'Features' }
]

export function PublicHeader() {  
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300 ${scrolled ? 'shadow-sm border-b' : 'border-b border-transparent'}`}>
      <div className={`flex items-center px-4 max-w-6xl mx-auto justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
        <div className="flex gap-6 items-center">
          <Link href="/" className="pr-10">
            <BrandLogo />
          </Link>
          <nav className="hidden md:flex gap-6">
            {LINKS.map(link => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {projectConfig.features.auth.enabled && (
            <div className="flex gap-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 