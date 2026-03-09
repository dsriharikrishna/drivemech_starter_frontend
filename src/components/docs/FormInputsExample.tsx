import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import CheckboxInput from "@/components/forms/CheckboxInput";
import PasswordInput from "@/components/forms/PasswordInput";

const FormInputsExample = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold mb-4">Text Input</h3>
          <CommonTextInput
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Password Input</h3>
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Text Area</h3>
          <CommonTextArea
            name="description"
            label="Description"
            placeholder="Enter description"
            rows={4}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Checkbox</h3>
          <CheckboxInput
            name="terms"
            label="I agree to the terms and conditions"
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
                    CommonTextInput
                  </code>{" "}
                  - Standard text input with label and validation
                </li>
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    PasswordInput
                  </code>{" "}
                  - Password field with show/hide toggle
                </li>
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    CommonTextArea
                  </code>{" "}
                  - Multi-line text input
                </li>
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    CheckboxInput
                  </code>{" "}
                  - Checkbox with label
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Integrated with react-hook-form</li>
                <li>Built-in validation support</li>
                <li>Error message display</li>
                <li>Consistent styling across all inputs</li>
                <li>Required field indicators</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Example Code:</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                {`import { useForm, FormProvider } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import PasswordInput from "@/components/forms/PasswordInput";

const methods = useForm();

<FormProvider {...methods}>
  <CommonTextInput
    name="email"
    label="Email"
    placeholder="Enter email"
    required
  />
  
  <PasswordInput
    name="password"
    label="Password"
    required
  />
</FormProvider>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default FormInputsExample;
