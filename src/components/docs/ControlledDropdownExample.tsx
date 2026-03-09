import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ControlledDropdown } from "@/components/ui/ControlledDropdown";

const ControlledDropdownExample = () => {
    const methods = useForm({
        defaultValues: {
            category: "1",
        },
    });

    const options = [
        { label: "Sedan", value: "1" },
        { label: "SUV", value: "2" },
        { label: "Hatchback", value: "3" },
        { label: "Coupe", value: "4" },
    ];

    return (
        <FormProvider {...methods}>
            <div className="space-y-6 max-w-2xl">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Controlled Dropdown</h3>
                    <ControlledDropdown
                        name="category"
                        label="Vehicle Category"
                        options={options}
                        required
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        Current Value: {methods.watch("category")}
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mt-8">
                    <h3 className="text-xl font-semibold mb-4">Usage</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">Component:</h4>
                            <p className="text-sm text-gray-700">
                                <code className="bg-gray-200 px-2 py-1 rounded">ControlledDropdown</code> - A wrapper around ModalDropdown specifically for react-hook-form integration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default ControlledDropdownExample;
