import { UseFormReturn } from "react-hook-form";
import { SelectServiceFormData } from "@/schemas/customer/selectService.schema";

interface Props {
  form: UseFormReturn<SelectServiceFormData>;
}

export default function GuestToggle({ form }: Props) {
  return (
    <label className="bg-white flex items-center gap-3 mt-2 cursor-pointer border border-gray-200 p-2 rounded-xl">
      <input type="checkbox" {...form.register("guest")} />
      <span>Continue as guest</span>
    </label>
  );
}
