import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RichTextEditor from "@/components/forms/RichTextEditor";

const RichTextEditorExample = () => {
  const methods = useForm({
    defaultValues: {
      emailContent: "",
      invoiceNotes: "",
      jobCardNotes: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="p-8 space-y-12">
      {/* Basic Example */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Basic Rich Text Editor</h3>
        <p className="text-gray-600 mb-4">
          A rich text editor with formatting toolbar for creating formatted
          content
        </p>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <RichTextEditor
              name="emailContent"
              label="Email Content"
              placeholder="Type your email here..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </FormProvider>
      </div>

      {/* Multiple Editors */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Multiple Rich Text Editors
        </h3>
        <p className="text-gray-600 mb-4">
          Use multiple editors in the same form for different content sections
        </p>
        <FormProvider {...methods}>
          <form className="space-y-4">
            <RichTextEditor
              name="invoiceNotes"
              label="Invoice Notes"
              placeholder="Enter invoice notes..."
            />

            <RichTextEditor
              name="jobCardNotes"
              label="Job Card Notes"
              placeholder="Enter job card notes..."
            />
          </form>
        </FormProvider>
      </div>

      {/* Without Label */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Without Label</h3>
        <FormProvider {...methods}>
          <RichTextEditor name="emailContent" placeholder="Start typing..." />
        </FormProvider>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">name</code>{" "}
                (required) - Field name for form registration
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">label</code>{" "}
                (optional) - Label text displayed above the editor
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  placeholder
                </code>{" "}
                (optional) - Placeholder text (default: "Type your email
                here...")
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">className</code>{" "}
                (optional) - Additional CSS classes
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Rich text formatting (bold, italic, underline, etc.)</li>
              <li>Lists (ordered and unordered)</li>
              <li>Text alignment</li>
              <li>Links and images</li>
              <li>Integrated with react-hook-form</li>
              <li>Error validation support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
              {`import { FormProvider, useForm } from "react-hook-form";
import RichTextEditor from "@/components/forms/RichTextEditor";

const MyForm = () => {
  const methods = useForm({
    defaultValues: {
      content: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <RichTextEditor
          name="content"
          label="Content"
          placeholder="Enter your content..."
        />
      </form>
    </FormProvider>
  );
};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditorExample;
