import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Convert from "./pages/Convert";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [pageSize, setPageSize] = useState("a4");
  const [showCaptions, setShowCaptions] = useState(true);
  const [customFilename, setCustomFilename] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [footerText, setFooterText] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  return (
    <Layout
      pageSize={pageSize}
      showCaptions={showCaptions}
      customFilename={customFilename}
      headerText={headerText}
      footerText={footerText}
      showHeader={showHeader}
      showFooter={showFooter}
      onPageSizeChange={setPageSize}
      onShowCaptionsChange={setShowCaptions}
      onCustomFilenameChange={setCustomFilename}
      onHeaderTextChange={setHeaderText}
      onFooterTextChange={setFooterText}
      onShowHeaderChange={setShowHeader}
      onShowFooterChange={setShowFooter}
    >
      <Routes>
        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route 
          path="/about" 
          element={<About />} 
        />
        <Route 
          path="/convert" 
          element={
            <Convert 
              pageSize={pageSize}
              showCaptions={showCaptions}
              customFilename={customFilename}
              headerText={headerText}
              footerText={footerText}
              showHeader={showHeader}
              showFooter={showFooter}
              onPageSizeChange={setPageSize}
              onShowCaptionsChange={setShowCaptions}
              onCustomFilenameChange={setCustomFilename}
              onHeaderTextChange={setHeaderText}
              onFooterTextChange={setFooterText}
              onShowHeaderChange={setShowHeader}
              onShowFooterChange={setShowFooter}
            />
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
