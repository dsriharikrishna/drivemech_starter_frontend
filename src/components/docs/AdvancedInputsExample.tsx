import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FloatingLabelInput from "@/components/forms/FloatingLabelInput";
import PhoneInput from "@/components/forms/PhoneInput";

const AdvancedInputsExample = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold mb-4">Floating Label Input</h3>
          <FloatingLabelInput
            label="Email Address"
            type="email"
            {...methods.register("email")}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Phone Input</h3>
          <PhoneInput
            label="Phone Number"
            {...methods.register("phone")}
            countryOptions={[
              { code: "+1", label: "United States", iso: "US" },
              { code: "+1", label: "Canada", iso: "CA" },
              { code: "+44", label: "United Kingdom", iso: "GB" },
              { code: "+61", label: "Australia", iso: "AU" },
              { code: "+64", label: "New Zealand", iso: "NZ" },
            ]}
          />
        </div>

        {/* Usage Instructions */}
        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-semibold mb-4">Usage</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Components:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    FloatingLabelInput
                  </code>{" "}
                  - Input with animated floating label
                </li>
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    PhoneInput
                  </code>{" "}
                  - Phone number input with country selector
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Floating label animation on focus</li>
                <li>Country code selection for phone input</li>
                <li>Integrated with react-hook-form</li>
                <li>Validation support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Example Code:</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                {`import FloatingLabelInput from "@/components/forms/FloatingLabelInput";
import PhoneInput from "@/components/forms/PhoneInput";

<FloatingLabelInput
  label="Email"
  type="email"
  {...register("email")}
/>

<PhoneInput
  label="Phone"
  {...register("phone")}
  countryOptions={countries}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default AdvancedInputsExample;
