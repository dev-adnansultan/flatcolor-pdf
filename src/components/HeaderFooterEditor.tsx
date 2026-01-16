import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface HeaderFooterConfig {
  headerText: string;
  footerText: string;
  showPageNumbers: boolean;
}

interface HeaderFooterEditorProps {
  config: HeaderFooterConfig;
  onChange: (config: HeaderFooterConfig) => void;
}

const HeaderFooterEditor = ({ config, onChange }: HeaderFooterEditorProps) => {
  const handleHeaderChange = (value: string) => {
    onChange({ ...config, headerText: value });
  };

  const handleFooterChange = (value: string) => {
    onChange({ ...config, footerText: value });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Header & Footer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="header-text" className="text-sm font-medium">
            Header Text
          </Label>
          <Input
            id="header-text"
            type="text"
            placeholder="e.g., Company Name or Document Title"
            value={config.headerText}
            onChange={(e) => handleHeaderChange(e.target.value)}
            className="text-sm"
            maxLength={50}
          />
          <p className="text-xs text-muted-foreground">
            {config.headerText.length}/50 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="footer-text" className="text-sm font-medium">
            Footer Text
          </Label>
          <Input
            id="footer-text"
            type="text"
            placeholder="e.g., Copyright notice or document info"
            value={config.footerText}
            onChange={(e) => handleFooterChange(e.target.value)}
            className="text-sm"
            maxLength={50}
          />
          <p className="text-xs text-muted-foreground">
            {config.footerText.length}/50 characters
          </p>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            💡 Tip: Header and footer text will appear on all pages of your PDF
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeaderFooterEditor;
