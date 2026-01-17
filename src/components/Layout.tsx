import { Link, useLocation } from "react-router-dom";
import { Github, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  pageSize?: string;
  showCaptions?: boolean;
  customFilename?: string;
  headerText?: string;
  footerText?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  onPageSizeChange?: (size: string) => void;
  onShowCaptionsChange?: (show: boolean) => void;
  onCustomFilenameChange?: (name: string) => void;
  onHeaderTextChange?: (text: string) => void;
  onFooterTextChange?: (text: string) => void;
  onShowHeaderChange?: (show: boolean) => void;
  onShowFooterChange?: (show: boolean) => void;
}

const Layout = ({ 
  children, 
  pageSize, 
  showCaptions, 
  customFilename,
  headerText,
  footerText,
  showHeader,
  showFooter,
  onPageSizeChange,
  onShowCaptionsChange,
  onCustomFilenameChange,
  onHeaderTextChange,
  onFooterTextChange,
  onShowHeaderChange,
  onShowFooterChange
}: LayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              <img 
                src="/logo.png" 
                alt="Flatcolor PDF Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex-shrink-0 object-contain"
              />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-foreground truncate bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Flatcolor PDF
                </h1>
              </div>
            </Link>

            {/* Navigation and Product Hunt */}
            <div className="flex items-center gap-3 sm:gap-6">
              <nav className="flex items-center gap-2 sm:gap-4">
                <Link to="/">
                  <Button 
                    variant={isActive("/") ? "default" : "ghost"} 
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    Home
                  </Button>
                </Link>
                <Link to="/about">
                  <Button 
                    variant={isActive("/about") ? "default" : "ghost"} 
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    About
                  </Button>
                </Link>
                <Link to="/convert">
                  <Button 
                    variant={isActive("/convert") ? "default" : "ghost"} 
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    Convert
                  </Button>
                </Link>
              </nav>
              
              {/* Product Hunt Badge - Hidden on mobile */}
              <a 
                href="https://www.producthunt.com/products/flatcolor-pdf?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-flatcolor-pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden lg:block hover:opacity-80 transition-opacity"
              >
                <img 
                  alt="Flatcolor PDF - Perfect PDFs for designers who value simplicity. | Product Hunt" 
                  width="250" 
                  height="54" 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1064052&theme=neutral&t=1768637118472"
                  className="w-[200px] h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Top Bar with Quick Options */}
      <TopBar 
        pageSize={pageSize}
        showCaptions={showCaptions}
        customFilename={customFilename}
        headerText={headerText}
        footerText={footerText}
        showHeader={showHeader}
        showFooter={showFooter}
        onPageSizeChange={onPageSizeChange}
        onShowCaptionsChange={onShowCaptionsChange}
        onCustomFilenameChange={onCustomFilenameChange}
        onHeaderTextChange={onHeaderTextChange}
        onFooterTextChange={onFooterTextChange}
        onShowHeaderChange={onShowHeaderChange}
        onShowFooterChange={onShowFooterChange}
      />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/logo.png" 
                  alt="Flatcolor PDF" 
                  className="w-8 h-8 rounded object-contain"
                />
                <span className="font-semibold text-foreground">Flatcolor PDF</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Create clean, two-color PDFs with no gradients. Free, fast, and privacy-focused.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://github.com/madnansultandotme/flatcolor-pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:info.adnansultan@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/convert" className="text-muted-foreground hover:text-foreground transition-colors">
                    Convert Images
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://github.com/madnansultandotme/flatcolor-pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    GitHub Repository
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="https://www.producthunt.com/products/flatcolor-pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Product Hunt
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:info.adnansultan@gmail.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    info.adnansultan@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/madnansultandotme/flatcolor-pdf/issues" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Report an Issue
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 Flatcolor PDF. All rights reserved.</p>
            <p>
              Made with ❤️ • Open Source • MIT License
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
