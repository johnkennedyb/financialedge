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
      <style>{`
        .rich-text-editor .ql-picker-item[data-value="sans-serif"]::before,
        .rich-text-editor .ql-picker-label[data-value="sans-serif"]::before { content: "Sans Serif"; }
        .rich-text-editor .ql-picker-item[data-value="serif"]::before,
        .rich-text-editor .ql-picker-label[data-value="serif"]::before { content: "Serif"; }
        .rich-text-editor .ql-picker-item[data-value="monospace"]::before,
        .rich-text-editor .ql-picker-label[data-value="monospace"]::before { content: "Monospace"; }
        .rich-text-editor .ql-picker-item[data-value="arial"]::before,
        .rich-text-editor .ql-picker-label[data-value="arial"]::before { content: "Arial"; }
        .rich-text-editor .ql-picker-item[data-value="courier-new"]::before,
        .rich-text-editor .ql-picker-label[data-value="courier-new"]::before { content: "Courier New"; }
        .rich-text-editor .ql-picker-item[data-value="georgia"]::before,
        .rich-text-editor .ql-picker-label[data-value="georgia"]::before { content: "Georgia"; }
        .rich-text-editor .ql-picker-item[data-value="helvetica"]::before,
        .rich-text-editor .ql-picker-label[data-value="helvetica"]::before { content: "Helvetica"; }
        .rich-text-editor .ql-picker-item[data-value="lucida"]::before,
        .rich-text-editor .ql-picker-label[data-value="lucida"]::before { content: "Lucida Console"; }
        .rich-text-editor .ql-picker-item[data-value="times-new-roman"]::before,
        .rich-text-editor .ql-picker-label[data-value="times-new-roman"]::before { content: "Times New Roman"; }
        .rich-text-editor .ql-picker-item[data-value="verdana"]::before,
        .rich-text-editor .ql-picker-label[data-value="verdana"]::before { content: "Verdana"; }
        .rich-text-editor .ql-picker-item[data-value="impact"]::before,
        .rich-text-editor .ql-picker-label[data-value="impact"]::before { content: "Impact"; }
        .rich-text-editor .ql-picker-item[data-value="comic-sans-ms"]::before,
        .rich-text-editor .ql-picker-label[data-value="comic-sans-ms"]::before { content: "Comic Sans MS"; }
        .rich-text-editor .ql-picker-item[data-value="trebuchet-ms"]::before,
        .rich-text-editor .ql-picker-label[data-value="trebuchet-ms"]::before { content: "Trebuchet MS"; }
        .rich-text-editor .ql-picker-item[data-value="roboto"]::before,
        .rich-text-editor .ql-picker-label[data-value="roboto"]::before { content: "Roboto"; }
        .rich-text-editor .ql-picker-item[data-value="open-sans"]::before,
        .rich-text-editor .ql-picker-label[data-value="open-sans"]::before { content: "Open Sans"; }
        .rich-text-editor .ql-picker-item[data-value="lato"]::before,
        .rich-text-editor .ql-picker-label[data-value="lato"]::before { content: "Lato"; }
        .rich-text-editor .ql-picker-item[data-value="poppins"]::before,
        .rich-text-editor .ql-picker-label[data-value="poppins"]::before { content: "Poppins"; }
        .rich-text-editor .ql-picker-item[data-value="merriweather"]::before,
        .rich-text-editor .ql-picker-label[data-value="merriweather"]::before { content: "Merriweather"; }
        .rich-text-editor .ql-picker-item[data-value="playfair-display"]::before,
        .rich-text-editor .ql-picker-label[data-value="playfair-display"]::before { content: "Playfair Display"; }
        .rich-text-editor .ql-picker-item[data-value="inter"]::before,
        .rich-text-editor .ql-picker-label[data-value="inter"]::before { content: "Inter"; }
        .rich-text-editor .ql-picker-item[data-value="nunito"]::before,
        .rich-text-editor .ql-picker-label[data-value="nunito"]::before { content: "Nunito"; }
        .rich-text-editor .ql-picker-item[data-value="raleway"]::before,
        .rich-text-editor .ql-picker-label[data-value="raleway"]::before { content: "Raleway"; }
      `}</style>
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
