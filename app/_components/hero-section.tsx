import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent animate-gradient" />
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="text-center space-y-8">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text bg-animate">
              Next-Cursor AI template
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-up">
            Become the best AI lead developer<br/>
            Build and deploy Next.js apps with AI
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4 opacity-0 animate-fade-up animation-delay-500">
          <Link href="/#features">
            <Button size="lg" className="text-lg px-8 hover:scale-105 transition-transform">
              Get Started
            </Button>
          </Link>
          <Link href="/#tips">
            <Button 
              size="lg" 
              variant="outline" 
            className="text-lg px-8 relative overflow-hidden group hover:scale-105 transition-transform"
          >
            <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 