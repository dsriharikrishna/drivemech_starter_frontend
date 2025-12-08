import CommonTextInput from "@/components/forms/CommonTextInput";
import Button from "@/components/ui/Button";

export const EnterTrackingScreen = ({ setStep }: { setStep: (v: "track") => void }) => (
  <section className="w-full py-20 ">
    <div className=" px-4 flex flex-col items-center">

      <h2 className="text-gray-heading text-3xl font-semibold text-center">
        Track Your Service <span className="text-gray-900">in Real-Time</span>
      </h2>

      <p className="text-gray-600 text-sm mt-2 text-center">
        Enter your reference number to see live updates and driver location
      </p>

      <div className="bg-gray-100 mt-8 rounded-2xl w-2xl p-3 flex flex-col ">
        <div className="flex flex-col justify-start">
          <span className="text-sm font-semibold text-gray-heading">Enter Tracking Number</span>
          <span className="text-xs text-gray-700 mt-1">Rego</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <CommonTextInput name="rego" placeholder="Enter Rego" label="" className="w-lg" />
          <Button
            variant="gradient"
            className="px-6 py-3 text-sm"
            onClick={() => setStep("track")}
          >
            ● Track
          </Button>
        </div>

        <p className="text-gray-500 text-xs mt-3">
          Your reference number was sent via SMS and email when you requested service
        </p>
      </div>
    </div>
  </section>
);
