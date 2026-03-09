import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import SharePercentageInput from "@/components/forms/SharePercentageInput";
import Button from "@/components/ui/Button";

const SharePercentageInputExample = () => {
  const methods1 = useForm({
    defaultValues: {
      ownershipShare: 50,
    },
  });

  const methods2 = useForm({
    defaultValues: {
      profitShare: 75,
      equityShare: 25,
    },
  });

  const onSubmit1 = (data: any) => {
    console.log("Form 1 Data:", data);
    if (typeof window !== "undefined" && (window as any).addToast) {
      (window as any).addToast(
        `Ownership share set to ${data.ownershipShare}%`,
        "success"
      );
    }
  };

  const onSubmit2 = (data: any) => {
    console.log("Form 2 Data:", data);
    if (typeof window !== "undefined" && (window as any).addToast) {
      (window as any).addToast("Shares updated successfully", "success");
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Basic Usage */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Basic Share Percentage Input
        </h3>
        <FormProvider {...methods1}>
          <form
            onSubmit={methods1.handleSubmit(onSubmit1)}
            className="space-y-4"
          >
            <SharePercentageInput
              name="ownershipShare"
              label="Ownership Share"
              min={0}
              max={100}
            />
            <div className="flex gap-4">
              <Button type="submit" variant="primary">
                Save Share
              </Button>
              <p className="text-sm text-gray-600 flex items-center">
                Current: {methods1.watch("ownershipShare")}%
              </p>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Multiple Shares */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Multiple Share Inputs</h3>
        <FormProvider {...methods2}>
          <form
            onSubmit={methods2.handleSubmit(onSubmit2)}
            className="space-y-4"
          >
            <SharePercentageInput
              name="profitShare"
              label="Profit Share"
              min={0}
              max={100}
            />
            <SharePercentageInput
              name="equityShare"
              label="Equity Share"
              min={0}
              max={100}
            />
            <div className="flex gap-4">
              <Button type="submit" variant="gradient">
                Update Shares
              </Button>
              <div className="text-sm text-gray-600 flex items-center gap-4">
                <span>Profit: {methods2.watch("profitShare")}%</span>
                <span>Equity: {methods2.watch("equityShare")}%</span>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Custom Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Range (25-75%)</h3>
        <FormProvider {...useForm({ defaultValues: { customShare: 50 } })}>
          <SharePercentageInput
            name="customShare"
            label="Limited Range Share"
            min={25}
            max={75}
          />
        </FormProvider>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">name</code>{" "}
                (required) - Field name for react-hook-form
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">label</code> -
                Label text (default: "Share Percentage")
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">min</code> -
                Minimum value (default: 0)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">max</code> -
                Maximum value (default: 100)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Combined number input and range slider</li>
              <li>Orange-themed styling</li>
              <li>Percent icon indicator</li>
              <li>Visual progress bar on slider</li>
              <li>Synchronized input and slider values</li>
              <li>Customizable min/max range</li>
              <li>Integrated with react-hook-form</li>
              <li>Required field indicator</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import { useForm, FormProvider } from "react-hook-form";
import SharePercentageInput from "@/components/forms/SharePercentageInput";

const methods = useForm({
  defaultValues: {
    ownershipShare: 50,
  },
});

<FormProvider {...methods}>
  <form onSubmit={methods.handleSubmit(onSubmit)}>
    <SharePercentageInput
      name="ownershipShare"
      label="Ownership Share"
      min={0}
      max={100}
    />
    <button type="submit">Save</button>
  </form>
</FormProvider>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePercentageInputExample;
