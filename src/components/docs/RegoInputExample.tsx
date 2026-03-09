import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import RegoInput from "@/components/forms/RegoInput";

const RegoInputExample = () => {
    const methods = useForm({
        defaultValues: {
            vehicleRego: "",
            vehicleState: "AP",
        },
    });

    const stateOptions = [
        { id: "1", name: "Andhra Pradesh", code: "AP" },
        { id: "2", name: "Telangana", code: "TS" },
        { id: "3", name: "Karnataka", code: "KA" },
        { id: "4", name: "Maharashtra", code: "MH" },
        { id: "5", name: "Tamil Nadu", code: "TN" },
        { id: "6", name: "Delhi", code: "DL" },
    ];

    return (
        <FormProvider {...methods}>
            <div className="space-y-6 max-w-2xl">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Registration Number Input</h3>
                    <RegoInput
                        name="vehicleRego"
                        stateName="vehicleState"
                        label="State"
                        regoLabel="Reg. Number"
                        stateOptions={stateOptions}
                        placeholder="e.g. 1234"
                        required
                    />
                </div>

                {/* Usage Instructions */}
                <div className="bg-gray-50 p-6 rounded-lg mt-8">
                    <h3 className="text-xl font-semibold mb-4">Usage</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">Component:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                <li>
                                    <code className="bg-gray-200 px-2 py-1 rounded">RegoInput</code> - Combined state selector and registration number input
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Props:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                <li><code className="font-semibold text-blue-600">name</code>: Name of the registration number field</li>
                                <li><code className="font-semibold text-blue-600">stateName</code>: Name of the state code field</li>
                                <li><code className="font-semibold text-blue-600">stateOptions</code>: Array of state options ({`{id, name, code}`})</li>
                                <li><code className="font-semibold text-blue-600">label</code>: Label for the state selector</li>
                                <li><code className="font-semibold text-blue-600">regoLabel</code>: Label for the registration input</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Example Code:</h4>
                            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                                {`import RegoInput from "@/components/forms/RegoInput";

const states = [
  { id: "1", name: "Andhra Pradesh", code: "AP" },
  // ...
];

<RegoInput
  name="regoNumber"
  stateName="state"
  label="State"
  regoLabel="Rego"
  stateOptions={states}
  required
/>`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default RegoInputExample;
