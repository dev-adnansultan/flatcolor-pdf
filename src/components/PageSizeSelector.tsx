import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type PageSize = "a4" | "letter";

interface PageSizeSelectorProps {
  value: PageSize;
  onChange: (value: PageSize) => void;
}

const pageSizes = [
  { id: "a4" as PageSize, name: "A4", dimensions: "210 × 297 mm" },
  { id: "letter" as PageSize, name: "Letter", dimensions: "8.5 × 11 in" },
];

const PageSizeSelector = ({ value, onChange }: PageSizeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">Page Size</Label>
      <Select value={value} onValueChange={(v) => onChange(v as PageSize)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {pageSizes.map((size) => (
            <SelectItem key={size.id} value={size.id}>
              <span className="font-medium">{size.name}</span>
              <span className="text-muted-foreground ml-2">({size.dimensions})</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PageSizeSelector;
