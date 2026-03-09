import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CommonNumberInput from "@/components/forms/CommonNumberInput";
import { DollarSign, Percent, Package } from "lucide-react";

const CommonNumberInputExample = () => {
  const methods = useForm({
    defaultValues: {
      quantity: 1,
      price: 0,
      discount: 0,
      stock: 0,
      rating: 0,
      percentage: 0,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="p-8 space-y-12">
      {/* Basic Number Input */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Basic Number Input</h3>
        <p className="text-gray-600 mb-4">
          Simple number input with min/max validation
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-4 max-w-md"
          >
            <CommonNumberInput
              name="quantity"
              label="Quantity"
              placeholder="Enter quantity"
              min={1}
              max={100}
              required
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

      {/* With Icons */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Number Input with Icons</h3>
        <p className="text-gray-600 mb-4">
          Add icons to provide visual context
        </p>
        <FormProvider {...methods}>
          <div className="space-y-4 max-w-md">
            <CommonNumberInput
              name="price"
              label="Price"
              placeholder="0.00"
              leftIcon={<DollarSign size={18} />}
              min={0}
              allowFloat
              decimalPlaces={2}
            />

            <CommonNumberInput
              name="discount"
              label="Discount"
              placeholder="0"
              icon={<Percent size={18} />}
              min={0}
              max={100}
            />

            <CommonNumberInput
              name="stock"
              label="Stock"
              placeholder="0"
              leftIcon={<Package size={18} />}
              min={0}
            />
          </div>
        </FormProvider>
      </div>

      {/* Float Numbers */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Decimal/Float Numbers</h3>
        <p className="text-gray-600 mb-4">
          Allow decimal values with specified precision
        </p>
        <FormProvider {...methods}>
          <div className="space-y-4 max-w-md">
            <CommonNumberInput
              name="rating"
              label="Rating (0-5)"
              placeholder="0.0"
              min={0}
              max={5}
              step={0.1}
              allowFloat
              decimalPlaces={1}
            />

            <CommonNumberInput
              name="percentage"
              label="Percentage"
              placeholder="0.00"
              min={0}
              max={100}
              allowFloat
              decimalPlaces={2}
              icon={<Percent size={18} />}
            />
          </div>
        </FormProvider>
      </div>

      {/* Compact Mode */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Compact Mode</h3>
        <p className="text-gray-600 mb-4">Use in tables or tight spaces</p>
        <FormProvider {...methods}>
          <div className="space-y-2 max-w-md">
            <CommonNumberInput
              name="quantity"
              placeholder="Qty"
              min={1}
              compact
            />
          </div>
        </FormProvider>
      </div>

      {/* Disabled State */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Disabled State</h3>
        <FormProvider {...methods}>
          <div className="max-w-md">
            <CommonNumberInput
              name="quantity"
              label="Quantity"
              placeholder="0"
              disabled
            />
          </div>
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
                (optional) - Label text
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  placeholder
                </code>{" "}
                (optional) - Placeholder text (default: "0")
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">min</code>{" "}
                (optional) - Minimum value
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">max</code>{" "}
                (optional) - Maximum value
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">step</code>{" "}
                (optional) - Step increment (default: 1)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  allowFloat
                </code>{" "}
                (optional) - Allow decimal values (default: false)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  decimalPlaces
                </code>{" "}
                (optional) - Number of decimal places (default: 2)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">icon</code>{" "}
                (optional) - Right icon element
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">leftIcon</code>{" "}
                (optional) - Left icon element
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">compact</code>{" "}
                (optional) - Compact mode for tables (default: false)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">required</code>{" "}
                (optional) - Required field
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">disabled</code>{" "}
                (optional) - Disabled state
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Integer and decimal number support</li>
              <li>Min/Max validation</li>
              <li>Step increment/decrement</li>
              <li>Icon support (left and right)</li>
              <li>Compact mode for tables</li>
              <li>Integrated with react-hook-form</li>
              <li>Error validation display</li>
              <li>Auto-formatting on blur</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
              {`import { FormProvider, useForm } from "react-hook-form";
import CommonNumberInput from "@/components/forms/CommonNumberInput";
import { DollarSign } from "lucide-react";

const MyForm = () => {
  const methods = useForm({
    defaultValues: {
      price: 0,
      quantity: 1,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        {/* Integer */}
        <CommonNumberInput
          name="quantity"
          label="Quantity"
          min={1}
          max={100}
          required
        />

        {/* Float with icon */}
        <CommonNumberInput
          name="price"
          label="Price"
          leftIcon={<DollarSign size={18} />}
          min={0}
          allowFloat
          decimalPlaces={2}
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

export default CommonNumberInputExample;
