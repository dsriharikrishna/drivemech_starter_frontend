import React from "react";
import MediaUploadSection from "@/components/forms/MediaUploadSection";

const MediaUploadSectionExample = () => {
    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h3 className="text-lg font-semibold mb-4">Media Upload Section</h3>
                <MediaUploadSection
                    onSave={() => alert("Saved!")}
                    onCancel={() => alert("Cancelled!")}
                    maxFiles={10}
                />
            </div>

            {/* Usage Instructions */}
            <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold mb-4">Usage</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Component:</h4>
                        <p className="text-sm text-gray-700">
                            <code className="bg-gray-200 px-2 py-1 rounded">MediaUploadSection</code> - A large, dashed-border dropzone section for multiple media uploads.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Props:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            <li><code className="font-semibold text-blue-600">onSave</code>: Callback for save action</li>
                            <li><code className="font-semibold text-blue-600">onCancel</code>: Callback for cancel action</li>
                            <li><code className="font-semibold text-blue-600">maxFiles</code>: Maximum allowed files</li>
                            <li><code className="font-semibold text-blue-600">maxSizeMB</code>: Maximum file size in MB</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaUploadSectionExample;
