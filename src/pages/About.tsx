import { Link } from "react-router-dom";
import { ArrowRight, Github, Mail, Heart, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <img 
                src="/logo.png" 
                alt="Flatcolor PDF" 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-lg"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About Flatcolor PDF
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              A free, open-source tool for creating clean, two-color PDFs from images. 
              Built with modern web technologies and a focus on simplicity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
              Our Mission
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Flatcolor PDF was created to solve a simple problem: converting images to 
                print-ready PDFs with consistent, flat colors. No gradients, no complicated 
                settings, just clean, professional results with the ability to name your PDFs 
                exactly how you want.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                We believe in keeping things simple. That's why our tool is free, requires 
                no sign-up, and processes everything right in your browser. Your privacy 
                matters, and your images never leave your device. Plus, you can customize 
                your PDF filename to match your workflow.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you're creating portfolios, catalogs, reports, or presentations, 
                Flatcolor PDF helps you maintain brand consistency with ease while giving 
                you full control over your output files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
                <p className="text-muted-foreground">
                  Easy to use, no learning curve. Just upload, customize, and download.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Privacy</h3>
                <p className="text-muted-foreground">
                  All processing happens locally. Your images stay on your device.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  Free for everyone, works everywhere. No barriers, no limitations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
              Built With Modern Technology
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">React 18</div>
                <p className="text-sm text-muted-foreground">UI Library</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">TypeScript</div>
                <p className="text-sm text-muted-foreground">Type Safety</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">Vite</div>
                <p className="text-sm text-muted-foreground">Build Tool</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">Tailwind</div>
                <p className="text-sm text-muted-foreground">Styling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Open Source & Free Forever
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Flatcolor PDF is open source and will always be free. We believe in 
              transparency and community-driven development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://github.com/madnansultandotme/flatcolor-pdf" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Github className="mr-2 w-5 h-5" />
                  View on GitHub
                </Button>
              </a>
              <a href="mailto:info.adnansultan@gmail.com">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Mail className="mr-2 w-5 h-5" />
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create your first PDF in seconds. No sign-up required.
            </p>
            <Link to="/convert">
              <Button size="lg" className="text-base px-8 py-6">
                Start Converting Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
