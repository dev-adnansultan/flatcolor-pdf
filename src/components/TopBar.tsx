import { useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

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
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Only show on convert page with controls
  if (location.pathname !== "/convert") {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Collapsible with toggle button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <span>PDF Settings</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {isExpanded && (
            <div className="pb-3 space-y-2.5">
              {/* Page Size & PDF Name - Compact */}
              <div className="flex gap-2">
                <select
                  value={pageSize}
                  onChange={(e) => onPageSizeChange?.(e.target.value)}
                  className="flex h-8 flex-1 rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm"
                >
                  <option value="a4">A4</option>
                  <option value="letter">Letter</option>
                </select>
                <input
                  type="text"
                  value={customFilename}
                  onChange={(e) => onCustomFilenameChange?.(e.target.value)}
                  placeholder="PDF name"
                  className="flex h-8 flex-1 rounded-md border border-input bg-background px-2 py-1 text-xs"
                  maxLength={50}
                />
              </div>

              {/* Toggles - Compact Grid */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onShowCaptionsChange?.(!showCaptions)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-md border transition-colors ${
                    showCaptions ? 'bg-primary/10 border-primary' : 'bg-background border-input'
                  }`}
                >
                  <div className={`w-8 h-4 rounded-full flex items-center transition-colors ${
                    showCaptions ? 'bg-primary' : 'bg-input'
                  }`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      showCaptions ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </div>
                  <span className="text-[10px] font-medium">Captions</span>
                </button>

                <button
                  onClick={() => onShowHeaderChange?.(!showHeader)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-md border transition-colors ${
                    showHeader ? 'bg-primary/10 border-primary' : 'bg-background border-input'
                  }`}
                >
                  <div className={`w-8 h-4 rounded-full flex items-center transition-colors ${
                    showHeader ? 'bg-primary' : 'bg-input'
                  }`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      showHeader ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </div>
                  <span className="text-[10px] font-medium">Header</span>
                </button>

                <button
                  onClick={() => onShowFooterChange?.(!showFooter)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-md border transition-colors ${
                    showFooter ? 'bg-primary/10 border-primary' : 'bg-background border-input'
                  }`}
                >
                  <div className={`w-8 h-4 rounded-full flex items-center transition-colors ${
                    showFooter ? 'bg-primary' : 'bg-input'
                  }`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      showFooter ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </div>
                  <span className="text-[10px] font-medium">Footer</span>
                </button>
              </div>

              {/* Header & Footer Text - Only show if enabled */}
              {showHeader && (
                <input
                  type="text"
                  value={headerText}
                  onChange={(e) => onHeaderTextChange?.(e.target.value)}
                  placeholder="Header text"
                  className="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs"
                  maxLength={50}
                />
              )}
              {showFooter && (
                <input
                  type="text"
                  value={footerText}
                  onChange={(e) => onFooterTextChange?.(e.target.value)}
                  placeholder="Footer text"
                  className="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs"
                  maxLength={50}
                />
              )}
            </div>
          )}
        </div>

        {/* Desktop: Always visible, horizontal layout */}
        <div className="hidden lg:block py-3">
          <div className="space-y-3">
            {/* First Row */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-foreground whitespace-nowrap">
                  Page Size
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => onPageSizeChange?.(e.target.value)}
                  className="flex h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                >
                  <option value="a4">A4 (210 × 297 mm)</option>
                  <option value="letter">Letter (8.5 × 11 in)</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium whitespace-nowrap">Show Captions</label>
                <button
                  onClick={() => onShowCaptionsChange?.(!showCaptions)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showCaptions ? 'bg-primary' : 'bg-input'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-background transition-transform ${
                    showCaptions ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium whitespace-nowrap">Show Header</label>
                <button
                  onClick={() => onShowHeaderChange?.(!showHeader)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showHeader ? 'bg-primary' : 'bg-input'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-background transition-transform ${
                    showHeader ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium whitespace-nowrap">Show Footer</label>
                <button
                  onClick={() => onShowFooterChange?.(!showFooter)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showFooter ? 'bg-primary' : 'bg-input'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-background transition-transform ${
                    showFooter ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center gap-3 flex-1">
                <label className="text-sm font-medium whitespace-nowrap">PDF Name</label>
                <input
                  type="text"
                  value={customFilename}
                  onChange={(e) => onCustomFilenameChange?.(e.target.value)}
                  placeholder="my-document"
                  className="flex h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  maxLength={50}
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="flex items-center gap-6 pt-2 border-t border-primary/20">
              <div className="flex items-center gap-3 flex-1">
                <label className="text-sm font-medium whitespace-nowrap min-w-[60px]">Header</label>
                <input
                  type="text"
                  value={headerText}
                  onChange={(e) => onHeaderTextChange?.(e.target.value)}
                  placeholder="Company Name or Document Title"
                  disabled={!showHeader}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm disabled:opacity-50"
                  maxLength={50}
                />
              </div>

              <div className="flex items-center gap-3 flex-1">
                <label className="text-sm font-medium whitespace-nowrap min-w-[60px]">Footer</label>
                <input
                  type="text"
                  value={footerText}
                  onChange={(e) => onFooterTextChange?.(e.target.value)}
                  placeholder="Copyright notice or document info"
                  disabled={!showFooter}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm disabled:opacity-50"
                  maxLength={50}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
