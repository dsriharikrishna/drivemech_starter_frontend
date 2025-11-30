"use client";

import { useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Bold,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Code,
  Link,
  Trash2,
  MoreVertical,
} from "lucide-react";

interface Props {
  form: UseFormReturn<any>;
}

export default function RichNoteEditor({ form }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync editor content → react-hook-form
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const handler = () => {
      form.setValue("notes", el.innerHTML);
    };

    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, [form]);

  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white relative">

      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-medium">Additional Note for the Mechanic</p>
        <span className="text-gray-500 text-sm cursor-pointer">▲</span>
      </div>

      {/* Editor Box */}
      <div className="mt-3 border rounded-lg p-3 min-h-[150px]">

        {/* Placeholder logic */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="e.g., Please check the unusual noise from the engine."
          className="
            outline-none w-full min-h-[100px]
            before:text-gray-400
            before:content-[attr(data-placeholder)]
            empty:before:block
            empty:before:absolute
          "
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between mt-3 text-gray-500">

          {/* Left side icons */}
          <div className="flex gap-4">
            <Bold className="w-4 h-4 cursor-pointer" />
            <Paperclip className="w-4 h-4 cursor-pointer" />
            <Link className="w-4 h-4 cursor-pointer" />
            <Smile className="w-4 h-4 cursor-pointer" />
            <ImageIcon className="w-4 h-4 cursor-pointer" />
            <Code className="w-4 h-4 cursor-pointer" />
          </div>

          {/* Right side icons */}
          <div className="flex gap-4">
            <MoreVertical className="w-4 h-4 cursor-pointer" />
            <Trash2 className="w-4 h-4 cursor-pointer" />
          </div>

        </div>
      </div>

    </div>
  );
}
