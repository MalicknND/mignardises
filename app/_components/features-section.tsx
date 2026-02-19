import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionLayout } from "@/components/layouts/section-layout";

export function FeaturesSection() {
  return (
    <SectionLayout id="features">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to build modern web applications, all in one place
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-primary/10">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <CardTitle className="text-2xl">Lightning Fast</CardTitle>
            <CardDescription className="text-base">Experience unmatched performance</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Built with the latest technologies to ensure your application runs at peak performance.
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-primary/10">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <CardTitle className="text-2xl">Dev with AI</CardTitle>
            <CardDescription className="text-base">Increase your productivity with AI</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Use AI to generate code, test, and debug your application.
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-primary/10">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <CardTitle className="text-2xl">Modern UI</CardTitle>
            <CardDescription className="text-base">Beautiful and responsive</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Crafted with modern design principles for an exceptional user experience.
          </CardContent>
        </Card>
      </div>
    </SectionLayout>
  );
} 