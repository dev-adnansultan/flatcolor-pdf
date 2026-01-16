import { useState, useCallback } from "react";
import { FileImage, Download, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import ImageUploader from "@/components/ImageUploader";
import ImagePreview from "@/components/ImagePreview";
import ColorPicker from "@/components/ColorPicker";
import LayoutSelector, { type LayoutType } from "@/components/LayoutSelector";
import PageSizeSelector, { type PageSize } from "@/components/PageSizeSelector";
import PDFPreview from "@/components/PDFPreview";
import HeaderFooterEditor, { type HeaderFooterConfig } from "@/components/HeaderFooterEditor";
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
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <FileImage className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Image to PDF</h1>
              <p className="text-sm text-muted-foreground">
                Clean, two-color PDFs with no gradients
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Images */}
          <div className="lg:col-span-2 space-y-6">
            <ImageUploader onImagesAdded={handleImagesAdded} />

            {images.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearAll}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
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
              <CardContent className="p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
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
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">PDF Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Colors */}
                <div className="space-y-4">
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

                <div className="border-t border-border pt-4">
                  <LayoutSelector value={layout} onChange={setLayout} />
                </div>

                <div className="border-t border-border pt-4">
                  <PageSizeSelector value={pageSize} onChange={setPageSize} />
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-captions" className="text-sm font-medium">
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

            {/* Header & Footer Editor */}
            <HeaderFooterEditor
              config={headerFooterConfig}
              onChange={setHeaderFooterConfig}
            />

            {/* Preview */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <PDFPreview
                  images={images}
                  layout={layout}
                  pageSize={pageSize}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleGeneratePDF}
              disabled={images.length === 0 || isGenerating}
            >
              <Download className="w-5 h-5 mr-2" />
              {isGenerating ? "Generating..." : "Generate PDF"}
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Flat colors only • No gradients • Print-ready output
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
