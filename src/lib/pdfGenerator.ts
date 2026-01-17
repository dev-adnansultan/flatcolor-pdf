import jsPDF from "jspdf";
import { type LayoutType } from "@/components/LayoutSelector";
import { type PageSize } from "@/components/PageSizeSelector";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface PDFGeneratorOptions {
  images: ImageFile[];
  layout: LayoutType;
  pageSize: PageSize;
  primaryColor: string;
  secondaryColor: string;
  showCaptions?: boolean;
  headerText?: string;
  footerText?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
};

export const generatePDF = async (options: PDFGeneratorOptions): Promise<Blob> => {
  const { 
    images, 
    layout, 
    pageSize, 
    primaryColor, 
    secondaryColor, 
    showCaptions = true, 
    headerText = "", 
    footerText = "",
    showHeader = true,
    showFooter = true,
    margins = { top: 15, right: 15, bottom: 15, left: 15 }
  } = options;

  const pageFormat = pageSize === "a4" ? "a4" : "letter";
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: pageFormat,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const primaryRgb = hexToRgb(primaryColor);
  const secondaryRgb = hexToRgb(secondaryColor);

  const margin = margins.top;
  const headerHeight = showHeader ? 12 : 0;
  const footerHeight = showFooter ? 10 : 0;
  const contentTop = margins.top + headerHeight + (showHeader ? 5 : 0);
  const contentHeight = pageHeight - contentTop - margins.bottom - footerHeight;
  const contentWidth = pageWidth - margins.left - margins.right;

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

  const { cols, rows, perPage } = getGridConfig();

  const pages: ImageFile[][] = [];
  for (let i = 0; i < images.length; i += perPage) {
    pages.push(images.slice(i, i + perPage));
  }

  if (pages.length === 0) {
    return pdf.output("blob");
  }

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
    if (pageIndex > 0) {
      pdf.addPage();
    }

    // Background
    pdf.setFillColor(secondaryRgb[0], secondaryRgb[1], secondaryRgb[2]);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    // Header (only if showHeader is true)
    if (showHeader) {
      pdf.setFillColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
      pdf.rect(0, 0, pageWidth, margins.top + headerHeight, "F");

      // Header text
      pdf.setTextColor(secondaryRgb[0], secondaryRgb[1], secondaryRgb[2]);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      
      const headerDisplayText = headerText || "Image to PDF";
      pdf.text(headerDisplayText, margins.left, margins.top + 4);
      
      pdf.setFont("helvetica", "normal");
      pdf.text(`Page ${pageIndex + 1} of ${pages.length}`, pageWidth - margins.right, margins.top + 4, {
        align: "right",
      });
    }

    // Grid
    const pageImages = pages[pageIndex];
    const gap = 5;
    const cellWidth = (contentWidth - gap * (cols - 1)) / cols;
    const cellHeight = (contentHeight - gap * (rows - 1)) / rows;

    for (let i = 0; i < pageImages.length; i++) {
      const image = pageImages[i];
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = margins.left + col * (cellWidth + gap);
      const y = contentTop + row * (cellHeight + gap);

      // Cell border
      pdf.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
      pdf.setLineWidth(0.5);
      pdf.rect(x, y, cellWidth, cellHeight, "S");

      try {
        const img = await loadImage(image.preview);
        const imgAspect = img.width / img.height;
        const cellAspect = cellWidth / (showCaptions ? cellHeight - 8 : cellHeight);

        let drawWidth = cellWidth - 4;
        let drawHeight = (showCaptions ? cellHeight - 8 : cellHeight) - 4;

        if (imgAspect > cellAspect) {
          drawHeight = drawWidth / imgAspect;
        } else {
          drawWidth = drawHeight * imgAspect;
        }

        const drawX = x + (cellWidth - drawWidth) / 2;
        const drawY = y + ((showCaptions ? cellHeight - 8 : cellHeight) - drawHeight) / 2;

        pdf.addImage(image.preview, "JPEG", drawX, drawY, drawWidth, drawHeight);

        // Caption
        if (showCaptions) {
          pdf.setFillColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          pdf.rect(x, y + cellHeight - 8, cellWidth, 8, "F");
          pdf.setTextColor(secondaryRgb[0], secondaryRgb[1], secondaryRgb[2]);
          pdf.setFontSize(7);
          const caption = image.file.name.length > 25 
            ? image.file.name.substring(0, 22) + "..." 
            : image.file.name;
          pdf.text(caption, x + cellWidth / 2, y + cellHeight - 3, { align: "center" });
        }
      } catch (error) {
        console.error("Failed to load image:", error);
      }
    }

    // Footer (only if showFooter is true)
    if (showFooter) {
      // Footer line
      pdf.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
      pdf.setLineWidth(0.5);
      pdf.line(margins.left, pageHeight - margins.bottom, pageWidth - margins.right, pageHeight - margins.bottom);

      // Footer text
      if (footerText) {
        pdf.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.text(footerText, margins.left, pageHeight - margins.bottom + 5);
      }
    }
  }

  return pdf.output("blob");
};

export const downloadPDF = (blob: Blob, filename: string = "images.pdf") => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
