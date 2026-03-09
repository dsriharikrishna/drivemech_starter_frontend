import React from "react";
import FormActionButtons from "@/components/ui/FormActionButtons";

const FormActionButtonsExample = () => {
    return (
        <div className="space-y-12 max-w-2xl">
            <div>
                <h3 className="text-lg font-semibold mb-4">Default (Orange)</h3>
                <FormActionButtons
                    onSave={() => alert("Saved")}
                    onCancel={() => alert("Cancelled")}
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Green Save Button</h3>
                <FormActionButtons
                    onSave={() => alert("Saved")}
                    onCancel={() => alert("Cancelled")}
                    saveButtonColor="green"
                    saveLabel="Confirm Changes"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Blue Save Button</h3>
                <FormActionButtons
                    onSave={() => alert("Saved")}
                    onCancel={() => alert("Cancelled")}
                    saveButtonColor="blue"
                    saveLabel="Submit"
                />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold mb-4">Usage</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Component:</h4>
                        <p className="text-sm text-gray-700">
                            <code className="bg-gray-200 px-2 py-1 rounded">FormActionButtons</code> - A standardized pair of Cancel/Save buttons for forms.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormActionButtonsExample;
