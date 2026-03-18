"use client";

import { useEffect, useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Custom font whitelist for Quill
const fontOptions = [
  "sans-serif",
  "serif",
  "monospace",
  "arial",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
  "times-new-roman",
  "verdana",
  "impact",
  "comic-sans-ms",
  "trebuchet-ms",
  "roboto",
  "open-sans",
  "lato",
  "poppins",
  "merriweather",
  "playfair-display",
  "inter",
  "nunito",
  "raleway",
];

// Type for Quill Font format
interface FontFormat {
  whitelist: string[];
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [QuillComponent, setQuillComponent] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import CSS first, then component
      Promise.all([
        // @ts-ignore - CSS files don't have type declarations
        import("react-quill-new/dist/quill.snow.css"),
        import("react-quill-new")
      ]).then(([, mod]) => {
        const Quill = (mod.default.Quill || (mod as any).Quill) as any;

        // Register custom fonts with Quill
        if (Quill) {
          const Font = Quill.import("formats/font") as FontFormat;
          Font.whitelist = fontOptions;
          Quill.register("formats/font", Font, true);
        }

        setQuillComponent(() => mod.default);
        setMounted(true);
      });
    }
  }, []);

  if (!mounted || !QuillComponent) {
    return (
      <div className="h-64 border border-border rounded-lg bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  const modules = {
    toolbar: [
      [{ font: fontOptions }, { size: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="rich-text-editor" style={{ minHeight: "300px" }}>
      <QuillComponent
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder || "Write your post content here..."}
        className="bg-background text-foreground"
      />
    </div>
  );
}
