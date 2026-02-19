'use client';

import { useEffect, useState } from "react";
import { projectConfig } from "@/config/project";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle"
import { Cookie } from "lucide-react";

const LINKS = [
  { href: '/#fonctionnalites', label: 'Fonctionnalités' },
  { href: '/#fonctionnement', label: 'Comment ça marche' },
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
          <Link href="/" className="flex items-center gap-2 pr-8">
            <Cookie className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">Mignardise</span>
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
                <Link href="/login">Se connecter</Link>
              </Button>
            <Button asChild>
              <Link href="/signup">Créer un compte</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 