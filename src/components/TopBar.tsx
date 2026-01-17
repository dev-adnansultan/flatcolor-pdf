import { useLocation } from "react-router-dom";

interface TopBarProps {
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

const TopBar = ({ 
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
}: TopBarProps) => {
  const location = useLocation();
  
  // Only show on convert page with controls
  if (location.pathname !== "/convert") {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="space-y-3">
          {/* First Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Page Size */}
            <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial">
              <label className="text-sm font-medium text-foreground whitespace-nowrap">
                Page Size
              </label>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange?.(e.target.value)}
                className="flex h-9 w-full sm:w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="a4">A4 (210 × 297 mm)</option>
                <option value="letter">Letter (8.5 × 11 in)</option>
              </select>
            </div>

            {/* Show Captions */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-foreground whitespace-nowrap">
                Show Captions
              </label>
              <button
                onClick={() => onShowCaptionsChange?.(!showCaptions)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  showCaptions ? 'bg-primary' : 'bg-input'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    showCaptions ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Show Header */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-foreground whitespace-nowrap">
                Show Header
              </label>
              <button
                onClick={() => onShowHeaderChange?.(!showHeader)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  showHeader ? 'bg-primary' : 'bg-input'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    showHeader ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Show Footer */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-foreground whitespace-nowrap">
                Show Footer
              </label>
              <button
                onClick={() => onShowFooterChange?.(!showFooter)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  showFooter ? 'bg-primary' : 'bg-input'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    showFooter ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Custom PDF Name */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <label className="text-sm font-medium text-foreground whitespace-nowrap">
                PDF Name
              </label>
              <input
                type="text"
                value={customFilename}
                onChange={(e) => onCustomFilenameChange?.(e.target.value)}
                placeholder="my-document"
                className="flex h-9 w-full sm:w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                maxLength={50}
              />
            </div>
          </div>

          {/* Second Row - Header and Footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2 border-t border-primary/20">
            {/* Header Text */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <label className="text-sm font-medium text-foreground whitespace-nowrap">
                Header
              </label>
              <input
                type="text"
                value={headerText}
                onChange={(e) => onHeaderTextChange?.(e.target.value)}
                placeholder="Company Name or Document Title"
                disabled={!showHeader}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                maxLength={50}
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap hidden lg:inline">
                {showHeader ? "Appears in preview" : "Hidden"}
              </span>
            </div>

            {/* Footer Text */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <label className="text-sm font-medium text-foreground whitespace-nowrap">
                Footer
              </label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => onFooterTextChange?.(e.target.value)}
                placeholder="Copyright notice or document info"
                disabled={!showFooter}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                maxLength={50}
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap hidden lg:inline">
                {showFooter ? "Appears in preview" : "Hidden"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
