import { useState, useCallback } from "react";
import { FileImage, Download, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
  rotation?: number;
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
  const [useColors, setUseColors] = useState(true);
  const [showBorders, setShowBorders] = useState(true);
  
  // Use props for these values
  const pageSize = propPageSize as PageSize;
  const showCaptions = propShowCaptions;
  const customFilename = propCustomFilename;
  const headerText = propShowHeader ? propHeaderText : "";
  const footerText = propShowFooter ? propFooterText : "";

  // Use default colors when color customization is disabled
  const effectivePrimaryColor = useColors ? primaryColor : "#000000";
  const effectiveSecondaryColor = useColors ? secondaryColor : "#FFFFFF";

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

  const handleRotateImage = useCallback((id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? { ...img, rotation: ((img.rotation || 0) + 90) % 360 }
          : img
      )
    );
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
        primaryColor: effectivePrimaryColor,
        secondaryColor: effectiveSecondaryColor,
        showCaptions,
        headerText: headerText,
        footerText: footerText,
        showHeader: propShowHeader,
        showFooter: propShowFooter,
        margins,
        showBorders,
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
                  onRotate={handleRotateImage}
                />
              </div>
            )}

            {/* Preview - Now in left column below images */}
            {images.length > 0 && (
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <PDFPreview
                    images={images}
                    layout={layout}
                    pageSize={pageSize}
                    primaryColor={effectivePrimaryColor}
                    secondaryColor={effectiveSecondaryColor}
                    headerText={headerText}
                    footerText={footerText}
                    showHeader={propShowHeader}
                    showFooter={propShowFooter}
                    showBorders={showBorders}
                  />
                </CardContent>
              </Card>
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
            {/* Generate Button - Now at top */}
            <Button
              size="lg"
              className="w-full text-sm sm:text-base"
              onClick={handleGeneratePDF}
              disabled={images.length === 0 || isGenerating}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {isGenerating ? "Generating..." : "Generate PDF"}
            </Button>

            <Card>
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-sm sm:text-lg mb-3">PDF Settings</CardTitle>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="colorMode"
                      checked={useColors}
                      onChange={() => setUseColors(true)}
                      className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                    />
                    <span className="text-xs sm:text-sm font-medium">Custom Colors</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="colorMode"
                      checked={!useColors}
                      onChange={() => setUseColors(false)}
                      className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                    />
                    <span className="text-xs sm:text-sm font-medium">Black & White</span>
                  </label>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-6">
                {/* Colors - Compact on mobile */}
                {useColors && (
                  <div className="space-y-2 sm:space-y-4">
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
                )}

                {!useColors && (
                  <div className="text-center py-4 text-xs sm:text-sm text-muted-foreground bg-muted/50 rounded-md">
                    Using default black & white for quick conversion
                  </div>
                )}

                <div className={`border-t border-border ${useColors ? 'pt-2 sm:pt-4' : 'pt-2'}`}>
                  <LayoutSelector value={layout} onChange={setLayout} />
                </div>

                {/* Border Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <Label className="text-xs sm:text-sm font-medium">Image Borders</Label>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                      Show outlines around images
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBorders(!showBorders)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      showBorders ? 'bg-primary' : 'bg-input'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        showBorders ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Color Presets - Only show when colors are enabled */}
            {useColors && (
              <ColorPresets
                primaryColor={primaryColor}
                onApplyPreset={(preset: ColorPreset) => {
                  setPrimaryColor(preset.primary);
                  setSecondaryColor(preset.secondary);
                }}
              />
            )}

            {/* Margin Controls */}
            <MarginControls margins={margins} onChange={setMargins} />
          </div>
        </div>
        {/* Bottom padding for mobile removed since button is no longer fixed */}
      </main>
    </div>
  );
};

export default Index;
