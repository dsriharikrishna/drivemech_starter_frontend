import React, { useState } from "react";
import DocumentUpload from "@/components/forms/DocumentUpload";

const DocumentUploadExample = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        if (selectedFile.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview("pdf-placeholder"); // Just for demo
        }
    };

    const handleFileRemove = () => {
        setFile(null);
        setPreview(null);
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
                <DocumentUpload
                    label="Upload Identity Proof"
                    file={file}
                    preview={preview}
                    onFileSelect={handleFileSelect}
                    onFileRemove={handleFileRemove}
                    required
                />
            </div>

            {/* Usage Instructions */}
            <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold mb-4">Usage</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Component:</h4>
                        <p className="text-sm text-gray-700">
                            <code className="bg-gray-200 px-2 py-1 rounded">DocumentUpload</code> - A flexible file upload component with preview support for images and PDFs.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Props:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            <li><code className="font-semibold text-blue-600">label</code>: Display label</li>
                            <li><code className="font-semibold text-blue-600">file</code>: Current Selected File object</li>
                            <li><code className="font-semibold text-blue-600">preview</code>: Data URL or placeholder for preview</li>
                            <li><code className="font-semibold text-blue-600">onFileSelect</code>: Callback when file is selected</li>
                            <li><code className="font-semibold text-blue-600">onFileRemove</code>: Callback when file is removed</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Example Code:</h4>
                        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                            {`import DocumentUpload from "@/components/forms/DocumentUpload";

const [file, setFile] = useState<File | null>(null);
const [preview, setPreview] = useState<string | null>(null);

<DocumentUpload
  label="Identity Proof"
  file={file}
  preview={preview}
  onFileSelect={(f) => setFile(f)}
  onFileRemove={() => setFile(null)}
/>`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentUploadExample;
