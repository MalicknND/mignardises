'use client';

import { useRouter } from "next/navigation";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-extrabold tracking-widest text-primary">500</h1>
          <div className="bg-primary px-2 text-sm rounded rotate-12 absolute">
            An error occurred
          </div>
        </div>
        <p className="text-muted-foreground text-xl">
          Oops! The page encountered an error.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center space-x-2">
              <Home size={16} />
              <span>Back Home</span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Previous Page</span>
          </Button>
        </div>
      </div>
    </div>
  );
} 