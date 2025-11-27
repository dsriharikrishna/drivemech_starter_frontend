import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
}

export default function ModeOfService({ form }: Props) {
  const mode = form.watch("mode");

  return (
    <div className="p-4 border rounded-xl bg-white">
      <p className="font-medium mb-3">Mode Of Service</p>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="pickup"
            {...form.register("mode")}
            checked={mode === "pickup"}
          />
          Pickup
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="walkin"
            {...form.register("mode")}
            checked={mode === "walkin"}
          />
          Walk In
        </label>
      </div>
    </div>
  );
}
