import { UseFormReturn } from "react-hook-form";
import { User, Phone, Mail } from "lucide-react";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { SelectServiceFormData } from "@/schemas/customer/selectService.schema";

interface Props {
  form: UseFormReturn<SelectServiceFormData>;
}

export default function PersonalDetails({ form }: Props) {
  return (
    <div className="p-3 border border-gray-200 rounded-xl bg-white">
      <p className="text-sm font-medium mb-2">Personal Details *</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <CommonTextInput
          name="fullName"
          label="Full Name"
          form={form}
          placeholder="Full Name"
          icon={<img src="/svgs/select-service/user-icon.svg" alt="User" />}
        />

        <CommonTextInput
          name="phone"
          label="Phone"
          form={form}
          placeholder="+33 | X XX XX XX XX"
          icon={<img src="/svgs/select-service/mobile-icon.svg" alt="Phone" />}
        />

        <CommonTextInput
          name="email"
          label="Email"
          form={form}
          placeholder="Email"
          icon={<img src="/svgs/select-service/mail-icon.svg" alt="Mail" />}
        />
      </div>
    </div>
  );
}
