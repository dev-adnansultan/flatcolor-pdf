import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type LayoutType = "single" | "grid-2x2" | "grid-3x3";

interface LayoutSelectorProps {
  value: LayoutType;
  onChange: (value: LayoutType) => void;
}

const layouts = [
  {
    id: "single" as LayoutType,
    name: "Single",
    description: "One image per page",
    icon: (
      <div className="w-full h-full p-1">
        <div className="w-full h-full border border-current rounded" />
      </div>
    ),
  },
  {
    id: "grid-2x2" as LayoutType,
    name: "2×2 Grid",
    description: "Four images per page",
    icon: (
      <div className="w-full h-full p-1 grid grid-cols-2 gap-0.5">
        <div className="border border-current rounded-sm" />
        <div className="border border-current rounded-sm" />
        <div className="border border-current rounded-sm" />
        <div className="border border-current rounded-sm" />
      </div>
    ),
  },
  {
    id: "grid-3x3" as LayoutType,
    name: "3×3 Grid",
    description: "Nine images per page",
    icon: (
      <div className="w-full h-full p-1 grid grid-cols-3 gap-0.5">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="border border-current rounded-sm" />
        ))}
      </div>
    ),
  },
];

const LayoutSelector = ({ value, onChange }: LayoutSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground">Page Layout</Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as LayoutType)}
        className="grid grid-cols-3 gap-3"
      >
        {layouts.map((layout) => (
          <Label
            key={layout.id}
            htmlFor={layout.id}
            className={`
              relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer
              transition-all duration-200
              ${
                value === layout.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-accent/50"
              }
            `}
          >
            <RadioGroupItem value={layout.id} id={layout.id} className="sr-only" />
            <div
              className={`w-10 h-12 ${
                value === layout.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {layout.icon}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{layout.name}</p>
              <p className="text-xs text-muted-foreground">{layout.description}</p>
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default LayoutSelector;
