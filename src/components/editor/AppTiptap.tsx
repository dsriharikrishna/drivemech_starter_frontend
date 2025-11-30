"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { UseFormReturn } from "react-hook-form";

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

interface Props {
  form: UseFormReturn<any>;
  name: string;
  placeholder?: string;
}

export default function AppTiptap({
  form,
  name,
  placeholder = "Type something...",
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder,
        emptyNodeClass:
          "text-gray-400 pointer-events-none",
      }),
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }: { editor: Editor }) => {
      form.setValue(name, editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] w-full outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white">

      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-medium">Additional Note for the Mechanic</p>
        <span className="text-gray-500 text-sm">▲</span>
      </div>

      {/* Editor Box */}
      <div className="mt-3 border border-gray-200 rounded-lg p-3">

        <EditorContent editor={editor} />

        {/* Toolbar */}
        <div className="flex items-center justify-between mt-3 text-gray-500">

          {/* Left icons */}
          <div className="flex gap-4">

            <Bold
              className={`w-4 h-4 cursor-pointer ${
                editor.isActive("bold") ? "text-black" : ""
              }`}
              onClick={() =>
                editor.chain().focus().toggleBold().run()
              }
            />

            <Italic
              className={`w-4 h-4 cursor-pointer ${
                editor.isActive("italic") ? "text-black" : ""
              }`}
              onClick={() =>
                editor.chain().focus().toggleItalic().run()
              }
            />

            <List
              className={`w-4 h-4 cursor-pointer ${
                editor.isActive("bulletList") ? "text-black" : ""
              }`}
              onClick={() =>
                editor.chain().focus().toggleBulletList().run()
              }
            />

            {/* Non-functional icons (UI only, matches your screenshot) */}
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
      </div>
    </div>
  );
}
