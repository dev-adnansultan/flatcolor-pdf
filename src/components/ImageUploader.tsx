import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  onImagesAdded: (files: File[]) => void;
}

const ImageUploader = ({ onImagesAdded }: ImageUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const imageFiles = acceptedFiles.filter((file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file.type)
      );
      if (imageFiles.length > 0) {
        onImagesAdded(imageFiles);
      }
    },
    [onImagesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
        transition-all duration-300 ease-out
        ${
          isDragActive
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-accent/50"
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-colors
            ${isDragActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
          `}
        >
          {isDragActive ? (
            <ImageIcon className="w-8 h-8" />
          ) : (
            <Upload className="w-8 h-8" />
          )}
        </div>
        <div>
          <p className="text-lg font-medium text-foreground">
            {isDragActive ? "Drop your images here" : "Drag & drop images here"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to browse • JPG, PNG, WEBP
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
