import { Link } from "react-router-dom";
import { ArrowRight, FileImage, Palette, Layout, Download, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <img 
                src="/logo.png" 
                alt="Flatcolor PDF" 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-lg"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Convert Images to
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Print-Ready PDFs
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create clean, two-color PDFs with no gradients. Perfect for brand-consistent, 
              professional documents. Free, fast, and works on any device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/convert">
                <Button size="lg" className="text-base px-8 py-6 w-full sm:w-auto">
                  Start Converting
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-base px-8 py-6 w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <FileImage className="w-4 h-4 text-primary" />
                <span>No Sign-up Required</span>
              </div>
            </div>
            
            {/* Product Hunt Badge */}
            <div className="mt-8 flex justify-center">
              <a 
                href="https://www.producthunt.com/products/flatcolor-pdf?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-flatcolor-pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  alt="Flatcolor PDF - Perfect PDFs for designers who value simplicity. | Product Hunt" 
                  width="250" 
                  height="54" 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1064052&theme=neutral&t=1768637118472"
                  className="w-[200px] sm:w-[250px] h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features to create professional PDFs in seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">8 Color Presets</h3>
                <p className="text-muted-foreground">
                  Choose from professionally designed color schemes or create your own custom palette.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Layout className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">5 Layout Options</h3>
                <p className="text-muted-foreground">
                  Single, 1×2, 2×1, 2×2, or 3×3 grid layouts. Perfect for any use case.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileImage className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Drag & Drop</h3>
                <p className="text-muted-foreground">
                  Simply drag and drop your images. Supports JPG, PNG, and WEBP formats.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom PDF Names</h3>
                <p className="text-muted-foreground">
                  Name your PDFs exactly how you want. Add your own custom filename before downloading.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Built with modern technology for blazing fast performance on any device.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                <p className="text-muted-foreground">
                  All processing happens in your browser. Your images never leave your device.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Create Beautiful PDFs?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users creating professional, print-ready PDFs every day.
            </p>
            <Link to="/convert">
              <Button size="lg" className="text-base px-8 py-6">
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • No sign-up needed • 100% free forever
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
