"use client";

import { useEffect, useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [QuillComponent, setQuillComponent] = useState<any>(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      // Dynamic import to avoid SSR issues
      Promise.all([
        import("react-quill"),
        import("quill")
      ]).then(([ReactQuillModule, QuillModule]) => {
        const ReactQuill = ReactQuillModule.default;
        const Quill = QuillModule.default || QuillModule;

        // Register custom fonts
        const Font = Quill.import("formats/font");
        Font.whitelist = [
          "arial", "courier-new", "georgia", "helvetica", "lucida",
          "times-new-roman", "verdana", "impact", "comic-sans-ms", "trebuchet-ms"
        ];
        Quill.register(Font, true);

        // Register custom font sizes
        const Size = Quill.import("formats/size");
        Size.whitelist = ["8px", "10px", "12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px", "48px"];
        Quill.register(Size, true);

        setQuillComponent(() => ReactQuill);
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
      [{ font: ["arial", "courier-new", "georgia", "helvetica", "lucida", "times-new-roman", "verdana", "impact", "comic-sans-ms", "trebuchet-ms"] }],
      [{ size: ["8px", "10px", "12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px", "48px"] }],
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

  const formats = [
    "font", "size", "header", "bold", "italic", "underline", "strike",
    "color", "background", "script", "list", "bullet", "indent", "align",
    "blockquote", "code-block", "link", "image",
  ];

  return (
    <div className="rich-text-editor">
      <QuillComponent
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
