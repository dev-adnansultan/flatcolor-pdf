import { type LayoutType } from "./LayoutSelector";
import { type PageSize } from "./PageSizeSelector";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface PDFPreviewProps {
  images: ImageFile[];
  layout: LayoutType;
  pageSize: PageSize;
  primaryColor: string;
  secondaryColor: string;
  headerText?: string;
  footerText?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const PDFPreview = ({
  images,
  layout,
  primaryColor,
  secondaryColor,
  headerText = "",
  footerText = "",
  showHeader = true,
  showFooter = true,
}: PDFPreviewProps) => {
  const getGridConfig = () => {
    switch (layout) {
      case "single":
        return { cols: 1, rows: 1, perPage: 1 };
      case "grid-1x2":
        return { cols: 1, rows: 2, perPage: 2 };
      case "grid-2x1":
        return { cols: 2, rows: 1, perPage: 2 };
      case "grid-2x2":
        return { cols: 2, rows: 2, perPage: 4 };
      case "grid-3x3":
        return { cols: 3, rows: 3, perPage: 9 };
    }
  };

  const { cols, perPage } = getGridConfig();

  const pages: ImageFile[][] = [];
  for (let i = 0; i < images.length; i += perPage) {
    pages.push(images.slice(i, i + perPage));
  }

  if (pages.length === 0) {
    pages.push([]);
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">
        Preview ({pages.length} {pages.length === 1 ? "page" : "pages"})
      </h3>
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {pages.map((pageImages, pageIndex) => (
          <div
            key={pageIndex}
            className="aspect-[210/297] rounded-lg border-2 overflow-hidden shadow-md"
            style={{
              backgroundColor: secondaryColor,
              borderColor: primaryColor,
            }}
          >
            {/* Header - only show if showHeader is true */}
            {showHeader && (
              <div
                className="h-8 flex items-center justify-between px-4"
                style={{ backgroundColor: primaryColor }}
              >
                <span
                  className="text-xs font-medium truncate"
                  style={{ color: secondaryColor }}
                >
                  {headerText || "Image to PDF"}
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: secondaryColor }}
                >
                  Page {pageIndex + 1}
                </span>
              </div>
            )}
            <div
              className={`p-4 ${showHeader ? 'h-[calc(100%-2rem)]' : 'h-full'}`}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: "0.5rem",
              }}
            >
              {pageImages.map((image) => (
                <div
                  key={image.id}
                  className="rounded overflow-hidden"
                  style={{ border: `2px solid ${primaryColor}` }}
                >
                  <img
                    src={image.preview}
                    alt={image.file.name}
                    className="w-full h-full object-contain"
                    style={{ backgroundColor: secondaryColor }}
                  />
                </div>
              ))}
              {/* Empty placeholders */}
              {pageImages.length < perPage &&
                [...Array(perPage - pageImages.length)].map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="rounded border-2 border-dashed flex items-center justify-center"
                    style={{ borderColor: primaryColor, opacity: 0.3 }}
                  >
                    <span
                      className="text-xs"
                      style={{ color: primaryColor }}
                    >
                      Empty
                    </span>
                  </div>
                ))}
            </div>
            {/* Footer - only show if showFooter is true */}
            {showFooter && footerText && (
              <div
                className="h-6 flex items-center px-4 text-xs border-t"
                style={{
                  backgroundColor: secondaryColor,
                  borderColor: primaryColor,
                  color: primaryColor,
                }}
              >
                {footerText}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFPreview;
