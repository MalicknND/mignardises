import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Project Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Project</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="/#tips" className="text-muted-foreground hover:text-foreground transition-colors">
                Tips
              </Link>
              <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Resources</h3>
            <nav className="flex flex-col gap-2">
              <Link href="https://docs.cursor.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                Cursor docs
              </Link>
              <Link href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                Next.js docs
              </Link>
              <Link href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                TypeScript docs
              </Link>
            </nav>
          </div>

          {/* About Us */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">About Us</h3>
            <nav className="flex flex-col gap-2">
              <Link href="https://www.smartingblock.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                Our Website
              </Link>
              <Link href="https://www.smartingblock.com/blog" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                Our Blog
              </Link>
              <Link href="https://www.linkedin.com/company/smarting-block" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                Our Linkedin
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 