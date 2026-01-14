"use client";

import type { ElementType, FocusEvent, KeyboardEvent } from "react";
import { useCms } from "./cms-context";

type EditableTextProps = {
  path: string;
  defaultValue: string;
  as?: ElementType;
  className?: string;
  singleLine?: boolean;
};

export default function EditableText({
  path,
  defaultValue,
  as,
  className,
  singleLine = false,
}: EditableTextProps) {
  const { editMode, getValue, setValue } = useCms();
  const value = getValue(path);
  const text = value ?? defaultValue;
  const Component = as ?? "span";

  return (
    <Component
      className={className}
      contentEditable={editMode}
      suppressContentEditableWarning
      spellCheck={editMode}
      onBlur={(event: FocusEvent<HTMLElement>) => {
        if (!editMode) return;
        const nextValue = event.currentTarget.textContent ?? "";
        setValue(path, nextValue);
      }}
      onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
        if (!singleLine) return;
        if (event.key === "Enter") {
          event.preventDefault();
          (event.currentTarget as HTMLElement).blur();
        }
      }}
    >
      {text}
    </Component>
  );
}
