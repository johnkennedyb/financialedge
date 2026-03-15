"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-64 border border-border rounded-lg bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
    </div>
  ),
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Add custom fonts to Quill
const fonts = [
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
];

const fontSizes = ["8px", "10px", "12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px", "48px"];

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Custom Quill configuration
    if (typeof window !== "undefined") {
      const Quill = require("quill");
      
      // Register custom fonts
      const Font = Quill.import("formats/font");
      Font.whitelist = fonts;
      Quill.register(Font, true);

      // Register custom font sizes
      const Size = Quill.import("formats/size");
      Size.whitelist = fontSizes;
      Quill.register(Size, true);
    }
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ font: fonts }],
        [{ size: fontSizes }],
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
    },
  };

  const formats = [
    "font",
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  if (!mounted) {
    return (
      <div className="h-64 border border-border rounded-lg bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="rich-text-editor">
      <QuillEditor
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "Write your post content here..."}
        className="bg-background text-foreground"
      />
    </div>
  );
}
