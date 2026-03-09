"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

import {
  Bold,
  Italic,
  List,
  Link2,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Trash2,
  MoreVertical,
} from "lucide-react";

interface StandaloneTiptapProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showToolbar?: boolean;
  minHeight?: string;
}

export default function StandaloneTiptap({
  value,
  onChange,
  placeholder = "Type something...",
  showToolbar = true,
  minHeight = "120px",
}: StandaloneTiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder,
        emptyNodeClass: "text-gray-400 pointer-events-none",
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }: { editor: Editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `min-h-[${minHeight}] w-full outline-none px-4 py-3`,
      },
    },
  });

  // Update editor content when value prop changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
      {/* Editor Box */}
      <EditorContent editor={editor} />

      {/* Toolbar Footer */}
      {showToolbar && (
        <div className="flex items-center justify-between border-t border-gray-200 px-3 py-2 bg-gray-50 text-gray-500">
          {/* Left icons */}
          <div className="flex gap-4">
            <Bold
              className={`w-4 h-4 cursor-pointer ${
                editor.isActive("bold") ? "text-black" : ""
              }`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            />

            <Italic
              className={`w-4 h-4 cursor-pointer ${
                editor.isActive("italic") ? "text-black" : ""
              }`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />

            <List
              className={`w-4 h-4 cursor-pointer ${
                editor.isActive("bulletList") ? "text-black" : ""
              }`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />

            {/* Non-functional icons (UI only) */}
            <Paperclip className="w-4 h-4 cursor-pointer" />
            <Link2
              className={`w-4 h-4 cursor-pointer ${
                editor.isActive("link") ? "text-black" : ""
              }`}
              onClick={() => {
                const url = window.prompt("Enter URL:");
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
            />
            <Smile className="w-4 h-4 cursor-pointer" />
            <ImageIcon className="w-4 h-4 cursor-pointer" />
          </div>

          {/* Right icons */}
          <div className="flex gap-4">
            <MoreVertical className="w-4 h-4 cursor-pointer" />

            <Trash2
              className="w-4 h-4 cursor-pointer"
              onClick={() => editor.commands.clearContent()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
