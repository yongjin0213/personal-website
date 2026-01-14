"use client";

import { useEffect, useRef, useState } from "react";
import { useCms } from "./cms/cms-context";

type DragDropImageProps = {
  label: string;
  helper?: string;
  className?: string;
  compact?: boolean;
};

export default function DragDropImage({
  label,
  helper,
  className,
  compact,
}: DragDropImageProps) {
  const { editMode } = useCms();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!editMode) {
    return null;
  }

  const setPreviewFromFile = (file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    const nextUrl = URL.createObjectURL(file);
    setPreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return nextUrl;
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewFromFile(event.target.files?.[0]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    setPreviewFromFile(event.dataTransfer.files?.[0]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  const paddingClass = compact ? "p-4" : "p-6";
  const sizeClass = compact ? "min-h-[160px]" : "min-h-[220px]";
  const labelClass = compact ? "text-sm" : "text-base";
  const helperClass = compact ? "text-xs" : "text-sm";

  return (
    <div
      className={`group relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--green-muted)] bg-[var(--green-bg)] text-center transition ${
        isDragging
          ? "border-[var(--green-accent)] bg-[color:rgba(142,189,141,0.15)]"
          : "hover:border-[var(--green-accent)]"
      } ${paddingClass} ${sizeClass} ${className ?? ""}`}
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label={label}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
      {previewUrl ? (
        <div className="relative h-full w-full">
          <img
            src={previewUrl}
            alt={label}
            className="h-full w-full rounded-xl object-cover"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--green-accent)]">
            Replace image
          </span>
        </div>
      ) : (
        <>
          <span className={`font-semibold text-[var(--green-accent)] ${labelClass}`}>
            {label}
          </span>
          <span
            className={`max-w-[220px] text-[color:rgba(31,45,31,0.7)] ${helperClass}`}
          >
            {helper ?? "Drag & drop an image or click to upload"}
          </span>
        </>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-transparent transition group-focus-visible:ring-[var(--green-accent)]" />
    </div>
  );
}
