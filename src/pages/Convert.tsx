import { useState, useCallback } from "react";
import { FileImage, Download, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import ImageUploader from "@/components/ImageUploader";
import ImagePreview from "@/components/ImagePreview";
import ColorPicker from "@/components/ColorPicker";
import LayoutSelector, { type LayoutType } from "@/components/LayoutSelector";
import { type PageSize } from "@/components/PageSizeSelector";
import PDFPreview from "@/components/PDFPreview";
import MarginControls, { type MarginConfig } from "@/components/MarginControls";
import ColorPresets, { type ColorPreset } from "@/components/ColorPresets";
import { generatePDF, downloadPDF } from "@/lib/pdfGenerator";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface ConvertProps {
  pageSize: string;
  showCaptions: boolean;
  customFilename: string;
  headerText: string;
  footerText: string;
  showHeader: boolean;
  showFooter: boolean;
  onPageSizeChange: (size: string) => void;
  onShowCaptionsChange: (show: boolean) => void;
  onCustomFilenameChange: (name: string) => void;
  onHeaderTextChange: (text: string) => void;
  onFooterTextChange: (text: string) => void;
  onShowHeaderChange: (show: boolean) => void;
  onShowFooterChange: (show: boolean) => void;
}

const Index = ({
  pageSize: propPageSize,
  showCaptions: propShowCaptions,
  customFilename: propCustomFilename,
  headerText: propHeaderText,
  footerText: propFooterText,
  showHeader: propShowHeader,
  showFooter: propShowFooter,
  onPageSizeChange,
  onShowCaptionsChange,
  onCustomFilenameChange,
  onHeaderTextChange,
  onFooterTextChange,
  onShowHeaderChange,
  onShowFooterChange
}: ConvertProps) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [layout, setLayout] = useState<LayoutType>("single");
  const [primaryColor, setPrimaryColor] = useState("#0284C7");
  const [secondaryColor, setSecondaryColor] = useState("#F0F9FF");
  const [margins, setMargins] = useState<MarginConfig>({
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Use props for these values
  const pageSize = propPageSize as PageSize;
  const showCaptions = propShowCaptions;
  const customFilename = propCustomFilename;
  const headerText = propShowHeader ? propHeaderText : "";
  const footerText = propShowFooter ? propFooterText : "";

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
        headerText: headerText,
        footerText: footerText,
        showHeader: propShowHeader,
        showFooter: propShowFooter,
        margins,
      });
      
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = customFilename.trim() 
        ? `${customFilename.trim()}.pdf` 
        : `flatcolor-pdf-${timestamp}.pdf`;
      downloadPDF(blob, filename);
      
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
                  headerText={headerText}
                  footerText={footerText}
                  showHeader={propShowHeader}
                  showFooter={propShowFooter}
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
    </div>
  );
};

export default Index;
