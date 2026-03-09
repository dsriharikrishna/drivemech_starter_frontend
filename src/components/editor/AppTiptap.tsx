"use client";

import { useEditor, EditorContent, type Editor, type Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { type UseFormReturn } from "react-hook-form";
import { useState, useRef, useEffect, useMemo } from "react";

import {
  Bold,
  Italic,
  List,
  Link2,
  Paperclip,
  Smile,
  ImageIcon,
  Trash2,
  MoreVertical,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  ListOrdered,
  X,
} from "lucide-react";

interface Props {
  form: UseFormReturn<any>;
  name: string;
  placeholder?: string;
  onImagesChange?: (images: File[]) => void;
  onFilesAttached?: (files: File[]) => void;
}

export default function AppTiptap({
  form,
  name,
  placeholder = "Type something...",
  onImagesChange,
  onFilesAttached,
}: Props) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [previews, setPreviews] = useState<{ id: string; url: string; file: File }[]>([]);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const emojiMenuRef = useRef<HTMLDivElement>(null);

  const extensions = useMemo<Extensions>(() => [
    StarterKit,
    Link.configure({
      openOnClick: false,
    }),
    Image.configure({
      inline: true,
      allowBase64: true,
    }),
    Underline,
    Placeholder.configure({
      placeholder,
      emptyNodeClass: "text-gray-400 pointer-events-none",
    }),
  ], [placeholder]);

  const editor = useEditor({
    extensions,
    content: form.getValues(name) || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      form.setValue(name, editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[120px] w-full outline-none pr-4",
      },
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setShowMoreMenu(false);
      }
      if (emojiMenuRef.current && !emojiMenuRef.current.contains(target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync previews with parent safely
  useEffect(() => {
    if (onImagesChange) {
      // Small optimization: only sync if the component is mounted and we have an update
      onImagesChange(previews.map(p => p.file));
    }
  }, [previews, onImagesChange]);

  const handleImageUpload = () => {
    const input = window.document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      const fileArray = Array.from(files);
      const newPreviews: { id: string; url: string; file: File }[] = [];

      fileArray.forEach((file) => {
        const url = URL.createObjectURL(file);
        newPreviews.push({ id: Math.random().toString(36).substr(2, 9), url, file });
      });

      setPreviews((prev) => [...prev, ...newPreviews]);
    };

    input.click();
  };

  const removeImage = (id: string) => {
    setPreviews((prev) => {
      const filtered = prev.filter(p => p.id !== id);
      const removed = prev.find(p => p.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return filtered;
    });
  };

  const handleFileAttachment = () => {
    const input = window.document.createElement("input");
    input.type = "file";
    input.multiple = true;

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      const fileArray = Array.from(files);

      if (onFilesAttached) {
        onFilesAttached(fileArray);
      }

      fileArray.forEach((file) => {
        if (editor) {
          editor
            .chain()
            .focus()
            .insertContent(`<p>📎 ${file.name}</p>`)
            .run();
        }
      });
    };

    input.click();
  };

  if (!editor) return null;

  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white space-y-4">
      <EditorContent editor={editor} />

      {/* Image Gallery at the bottom */}
      {previews.length > 0 && (
        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-700 mb-3">Images</p>
          <div className="flex flex-wrap gap-3">
            {previews.map((preview) => (
              <div key={preview.id} className="relative group">
                <img
                  src={preview.url}
                  alt="upload preview"
                  className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(preview.id)}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between mt-3 text-gray-500 pt-2 border-t border-gray-50">
        <div className="flex gap-4">
          <Bold
            className={`w-4 h-4 cursor-pointer ${editor.isActive("bold") ? "text-black" : ""}`}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />

          <Italic
            className={`w-4 h-4 cursor-pointer ${editor.isActive("italic") ? "text-black" : ""}`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />

          <List
            className={`w-4 h-4 cursor-pointer ${editor.isActive("bulletList") ? "text-black" : ""}`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />

          <Paperclip
            className="w-4 h-4 cursor-pointer"
            onClick={handleFileAttachment}
          />

          <Link2
            className={`w-4 h-4 cursor-pointer ${editor.isActive("link") ? "text-black" : ""}`}
            onClick={() => {
              const url = window.prompt("Enter URL:");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
          />

          <div className="relative" ref={emojiMenuRef}>
            <Smile
              className={`w-4 h-4 cursor-pointer hover:text-black transition-colors ${showEmojiPicker ? "text-black" : ""}`}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-50 min-w-[220px]">
                <div className="grid grid-cols-6 gap-2">
                  {["😊", "😂", "❤️", "👍", "🎉", "🔥", "✅", "⭐", "💯", "🚀", "👏", "💪", "🙌", "✨", "🎈", "🎂", "🍕", "☕"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        editor.chain().focus().insertContent(emoji).run();
                        setShowEmojiPicker(false);
                      }}
                      className="text-2xl hover:bg-gray-100 rounded-lg p-1.5 transition-all hover:scale-110 flex items-center justify-center"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ImageIcon
            className="w-4 h-4 cursor-pointer"
            onClick={handleImageUpload}
          />
        </div>

        <div className="flex gap-4 relative">
          <div className="relative" ref={moreMenuRef}>
            <MoreVertical
              className="w-4 h-4 cursor-pointer"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
            />
            {showMoreMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[160px]">
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().toggleUnderline().run();
                    setShowMoreMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${editor.isActive("underline") ? "text-black font-medium" : "text-gray-700"
                    }`}
                >
                  <UnderlineIcon size={14} />
                  Underline
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().toggleStrike().run();
                    setShowMoreMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${editor.isActive("strike") ? "text-black font-medium" : "text-gray-700"
                    }`}
                >
                  <Strikethrough size={14} />
                  Strikethrough
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().toggleCode().run();
                    setShowMoreMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${editor.isActive("code") ? "text-black font-medium" : "text-gray-700"
                    }`}
                >
                  <Code size={14} />
                  Code
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().toggleOrderedList().run();
                    setShowMoreMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${editor.isActive("orderedList") ? "text-black font-medium" : "text-gray-700"
                    }`}
                >
                  <ListOrdered size={14} />
                  Numbered List
                </button>
              </div>
            )}
          </div>

          <Trash2
            className="w-4 h-4 cursor-pointer"
            onClick={() => editor.commands.clearContent()}
          />
        </div>
      </div>
    </div>
  );
}
