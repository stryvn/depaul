"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import { Markdown } from "tiptap-markdown";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  Upload,
  Globe,
  Undo,
  Redo,
  Code,
  Eye,
} from "lucide-react";
import { uploadImage } from "@/app/actions/upload";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [mode, setMode] = useState<"visual" | "markdown">("visual");
  const [uploading, setUploading] = useState(false);
  const [imageUrlPrompt, setImageUrlPrompt] = useState(false);
  const [onlineUrlInput, setOnlineUrlInput] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: false,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-brand-royal underline",
        },
      }),
      Markdown.configure({
        html: true,
        tightLists: true,
        bulletListMarker: "-",
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] max-h-[600px] overflow-y-auto px-5 py-4 focus:outline-none font-sans text-slate-800 text-base leading-relaxed",
      },
    },
    onUpdate({ editor }) {
      // @ts-expect-error - storage.markdown is injected by tiptap-markdown
      const markdown = editor.storage.markdown?.getMarkdown() ?? editor.getHTML();
      onChange(markdown);
    },
  });

  // Sync if value changes externally (e.g. initial load)
  useEffect(() => {
    if (editor && value && !editor.isFocused) {
      // @ts-expect-error - setContent accepts markdown string with tiptap-markdown
      const currentMarkdown = editor.storage.markdown?.getMarkdown() ?? "";
      if (currentMarkdown !== value && !currentMarkdown) {
        editor.commands.setContent(value);
      }
    }
  }, [value, editor]);

  // Handle local file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImage(formData);
      if (res.url) {
        editor.chain().focus().setImage({ src: res.url, alt: file.name }).run();
      } else if (res.error) {
        alert(res.error);
      }
    } catch {
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Handle online image URL insertion
  const handleInsertOnlineImage = () => {
    if (!onlineUrlInput.trim() || !editor) return;
    editor.chain().focus().setImage({ src: onlineUrlInput.trim() }).run();
    setOnlineUrlInput("");
    setImageUrlPrompt(false);
  };

  // Handle hyperlink insertion
  const handleSetLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter destination URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  if (!editor) {
    return (
      <div className="min-h-[300px] border border-slate-300 rounded-xl bg-slate-50 animate-pulse flex items-center justify-center text-slate-400 text-sm">
        Loading visual editor...
      </div>
    );
  }

  return (
    <div className="border border-slate-300 rounded-2xl overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-brand-royal focus-within:border-transparent transition-all">
      {/* Top Toolbar */}
      <div className="bg-slate-50/90 border-b border-slate-200 p-2 flex flex-wrap items-center justify-between gap-1.5 select-none">
        {/* Formatting Actions */}
        <div className="flex flex-wrap items-center gap-1">
          {/* Headings */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              editor.isActive("heading", { level: 2 })
                ? "bg-brand-royal text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-200/70"
            }`}
            title="Large Heading (H2)"
          >
            <Heading2 className="w-3.5 h-3.5" />
            <span>Heading</span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              editor.isActive("heading", { level: 3 })
                ? "bg-brand-royal text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-200/70"
            }`}
            title="Sub-Heading (H3)"
          >
            <Heading3 className="w-3.5 h-3.5" />
            <span>Sub-head</span>
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Bold & Italic */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              editor.isActive("bold")
                ? "bg-brand-royal text-white"
                : "text-slate-700 hover:bg-slate-200/70"
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              editor.isActive("italic")
                ? "bg-brand-royal text-white"
                : "text-slate-700 hover:bg-slate-200/70"
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              editor.isActive("bulletList")
                ? "bg-brand-royal text-white"
                : "text-slate-700 hover:bg-slate-200/70"
            }`}
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              editor.isActive("orderedList")
                ? "bg-brand-royal text-white"
                : "text-slate-700 hover:bg-slate-200/70"
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              editor.isActive("blockquote")
                ? "bg-brand-royal text-white"
                : "text-slate-700 hover:bg-slate-200/70"
            }`}
            title="Quote"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-200/70 transition-all cursor-pointer"
            title="Horizontal Divider"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Links */}
          <button
            type="button"
            onClick={handleSetLink}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              editor.isActive("link")
                ? "bg-brand-royal text-white"
                : "text-slate-700 hover:bg-slate-200/70"
            }`}
            title="Insert Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Image Options */}
          {/* 1. Upload from computer */}
          <label
            className="p-1.5 rounded-lg text-xs text-brand-royal hover:bg-blue-50 transition-all flex items-center gap-1 cursor-pointer font-medium"
            title="Upload image from computer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {uploading ? "Uploading..." : "Upload Photo"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>

          {/* 2. Paste online image URL */}
          <button
            type="button"
            onClick={() => setImageUrlPrompt(!imageUrlPrompt)}
            className="p-1.5 rounded-lg text-xs text-brand-royal hover:bg-blue-50 transition-all flex items-center gap-1 cursor-pointer font-medium"
            title="Insert online image URL"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Image URL</span>
          </button>
        </div>

        {/* Right toolbar controls: Undo/Redo & Mode Switch */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-200/70 disabled:opacity-30 cursor-pointer"
            title="Undo"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-200/70 disabled:opacity-30 cursor-pointer"
            title="Redo"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={() => {
              if (mode === "visual") {
                // @ts-expect-error - storage.markdown is injected by tiptap-markdown
                const md = editor.storage.markdown?.getMarkdown() ?? "";
                onChange(md);
                setMode("markdown");
              } else {
                editor.commands.setContent(value);
                setMode("visual");
              }
            }}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-200/70 hover:bg-slate-300/70 text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
            title={mode === "visual" ? "Switch to Raw Markdown" : "Switch to Visual WYSIWYG Editor"}
          >
            {mode === "visual" ? (
              <>
                <Code className="w-3 h-3" />
                <span>Markdown</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3" />
                <span>Visual</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Online Image URL Prompt Bar */}
      {imageUrlPrompt && (
        <div className="p-3 bg-blue-50/90 border-b border-blue-100 flex items-center gap-2">
          <Globe className="w-4 h-4 text-brand-royal shrink-0" />
          <input
            type="url"
            value={onlineUrlInput}
            onChange={(e) => setOnlineUrlInput(e.target.value)}
            placeholder="Paste any online image URL (e.g. https://images.unsplash.com/...)"
            className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-royal"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleInsertOnlineImage();
              }
            }}
          />
          <button
            type="button"
            onClick={handleInsertOnlineImage}
            className="px-3 py-1.5 text-xs font-semibold bg-brand-royal text-white rounded-lg hover:bg-brand-royal/90 cursor-pointer"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={() => {
              setImageUrlPrompt(false);
              setOnlineUrlInput("");
            }}
            className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Editor Body */}
      {mode === "visual" ? (
        <div className="cursor-text">
          <EditorContent editor={editor} />
        </div>
      ) : (
        <textarea
          rows={14}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            editor.commands.setContent(e.target.value);
          }}
          className="w-full px-5 py-4 focus:outline-none font-mono text-sm leading-relaxed text-slate-800 bg-slate-50/40 resize-y"
          placeholder="Write in raw Markdown..."
        />
      )}
    </div>
  );
}
