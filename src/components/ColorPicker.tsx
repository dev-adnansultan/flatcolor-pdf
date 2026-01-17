import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  description?: string;
}

const ColorPicker = ({ label, color, onChange, description }: ColorPickerProps) => {
  const handleColorClick = () => {
    const input = document.getElementById(`color-input-${label.replace(/\s+/g, '-')}`) as HTMLInputElement;
    input?.click();
  };

  return (
    <div className="space-y-1 sm:space-y-2">
      <Label className="text-xs sm:text-sm font-medium text-foreground">{label}</Label>
      {description && (
        <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{description}</p>
      )}
      <div className="flex items-center gap-2 sm:gap-3">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-border shadow-sm cursor-pointer flex-shrink-0 hover:border-primary transition-colors"
          style={{ backgroundColor: color }}
          onClick={handleColorClick}
        />
        <input
          id={`color-input-${label.replace(/\s+/g, '-')}`}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="hidden"
          style={{ display: 'none', position: 'absolute', visibility: 'hidden', width: 0, height: 0 }}
        />
        <Input
          type="text"
          value={color.toUpperCase()}
          onChange={(e) => {
            const value = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
              onChange(value);
            }
          }}
          className="font-mono text-xs sm:text-sm uppercase h-9 sm:h-10 flex-1"
          placeholder="#000000"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
