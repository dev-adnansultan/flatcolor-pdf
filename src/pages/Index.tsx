import { useState, useCallback } from "react";
import { FileImage, Download, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import ImageUploader from "@/components/ImageUploader";
import ImagePreview from "@/components/ImagePreview";
import ColorPicker from "@/components/ColorPicker";
import LayoutSelector, { type LayoutType } from "@/components/LayoutSelector";
import PageSizeSelector, { type PageSize } from "@/components/PageSizeSelector";
import PDFPreview from "@/components/PDFPreview";
import HeaderFooterEditor, { type HeaderFooterConfig } from "@/components/HeaderFooterEditor";
import MarginControls, { type MarginConfig } from "@/components/MarginControls";
import ColorPresets, { type ColorPreset } from "@/components/ColorPresets";
import { generatePDF, downloadPDF } from "@/lib/pdfGenerator";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

const Index = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [layout, setLayout] = useState<LayoutType>("single");
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [primaryColor, setPrimaryColor] = useState("#0284C7");
  const [secondaryColor, setSecondaryColor] = useState("#F0F9FF");
  const [showCaptions, setShowCaptions] = useState(true);
  const [margins, setMargins] = useState<MarginConfig>({
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
  });
  const [headerFooterConfig, setHeaderFooterConfig] = useState<HeaderFooterConfig>({
    headerText: "",
    footerText: "",
    showPageNumbers: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImagesAdded = useCallback((files: File[]) => {
    const newImages: ImageFile[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    toast({
      title: "Images added",
      description: `${files.length} image${files.length > 1 ? "s" : ""} uploaded successfully.`,
    });
  }, []);

  const handleRemoveImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const handleReorderImages = useCallback((newImages: ImageFile[]) => {
    setImages(newImages);
  }, []);

  const handleClearAll = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    toast({
      title: "Images cleared",
      description: "All images have been removed.",
    });
  }, [images]);

  const handleGeneratePDF = async () => {
    if (images.length === 0) {
      toast({
        title: "No images",
        description: "Please upload at least one image.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const blob = await generatePDF({
        images,
        layout,
        pageSize,
        primaryColor,
        secondaryColor,
        showCaptions,
        headerText: headerFooterConfig.headerText,
        footerText: headerFooterConfig.footerText,
        margins,
      });
      
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadPDF(blob, `images-${timestamp}.pdf`);
      
      toast({
        title: "PDF generated!",
        description: "Your PDF has been downloaded successfully.",
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO />
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src="/logo.png" 
                alt="Flatcolor PDF Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex-shrink-0 object-contain"
              />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-foreground truncate bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Flatcolor PDF
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Clean, two-color PDFs with no gradients
                </p>
              </div>
            </div>
            <a 
              href="https://github.com/dev-adnansultan/flatcolor-pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="hidden md:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Upload & Images */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <ImageUploader onImagesAdded={handleImagesAdded} />

            {images.length > 0 && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearAll}
                    className="text-destructive hover:text-destructive text-xs sm:text-sm"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Clear All
                  </Button>
                </div>
                <ImagePreview
                  images={images}
                  onRemove={handleRemoveImage}
                  onReorder={handleReorderImages}
                />
              </div>
            )}

            {/* Color Rule Notice */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-medium text-foreground">Two-Color Only</p>
                  <p className="text-muted-foreground mt-1">
                    This tool enforces a strict two-color scheme. No gradients, shadows, or
                    transparency effects are applied. Perfect for print-ready, brand-consistent
                    documents.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings & Preview */}
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">PDF Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Colors */}
                <div className="space-y-3 sm:space-y-4">
                  <ColorPicker
                    label="Primary Color"
                    color={primaryColor}
                    onChange={setPrimaryColor}
                    description="Used for headers, borders, and accents"
                  />
                  <ColorPicker
                    label="Secondary Color"
                    color={secondaryColor}
                    onChange={setSecondaryColor}
                    description="Used for backgrounds and text"
                  />
                </div>

                <div className="border-t border-border pt-3 sm:pt-4">
                  <LayoutSelector value={layout} onChange={setLayout} />
                </div>

                <div className="border-t border-border pt-3 sm:pt-4">
                  <PageSizeSelector value={pageSize} onChange={setPageSize} />
                </div>

                <div className="border-t border-border pt-3 sm:pt-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-captions" className="text-xs sm:text-sm font-medium">
                      Show Captions
                    </Label>
                    <Switch
                      id="show-captions"
                      checked={showCaptions}
                      onCheckedChange={setShowCaptions}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Display filename below each image
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Color Presets */}
            <ColorPresets
              primaryColor={primaryColor}
              onApplyPreset={(preset: ColorPreset) => {
                setPrimaryColor(preset.primary);
                setSecondaryColor(preset.secondary);
              }}
            />

            {/* Margin Controls */}
            <MarginControls margins={margins} onChange={setMargins} />

            {/* Header & Footer Editor */}
            <HeaderFooterEditor
              config={headerFooterConfig}
              onChange={setHeaderFooterConfig}
            />

            {/* Preview - Hidden on mobile */}
            <Card className="hidden md:block">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <PDFPreview
                  images={images}
                  layout={layout}
                  pageSize={pageSize}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  headerText={headerFooterConfig.headerText}
                  footerText={headerFooterConfig.footerText}
                />
              </CardContent>
            </Card>

            {/* Generate Button - Fixed on mobile */}
            <div className="md:relative fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border md:border-0 md:p-0 z-40">
              <Button
                size="lg"
                className="w-full text-sm sm:text-base"
                onClick={handleGeneratePDF}
                disabled={images.length === 0 || isGenerating}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {isGenerating ? "Generating..." : "Generate PDF"}
              </Button>
            </div>
          </div>
        </div>
        {/* Bottom padding for fixed button on mobile */}
        <div className="h-20 md:hidden" />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 sm:mt-12 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Flatcolor PDF" 
                className="w-6 h-6 rounded object-contain"
              />
              <span className="font-semibold text-foreground">Flatcolor PDF</span>
            </div>
            <p className="text-center text-xs sm:text-sm text-muted-foreground">
              Flat colors only • No gradients • Print-ready output
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a 
                href="https://github.com/dev-adnansultan/flatcolor-pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <span>•</span>
              <span>© 2026 Flatcolor PDF</span>
              <span>•</span>
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
