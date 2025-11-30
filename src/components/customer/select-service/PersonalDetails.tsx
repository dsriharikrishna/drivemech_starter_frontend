import { UseFormReturn } from "react-hook-form";
import { User, Phone, Mail } from "lucide-react";
import CommonTextInput from "@/components/forms/CommonTextInput";

interface Props {
  form: UseFormReturn<any>;
}

export default function PersonalDetails({ form }: Props) {
  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white">
      <p className="font-medium mb-3">Personal Details *</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CommonTextInput
          name="fullName"
          label="Full Name"
          form={form}
          placeholder="Full Name"
          icon={<User className="w-4 h-4 text-gray-400" />}
        />

        <CommonTextInput
          name="phone"
          label="Phone"
          form={form}
          placeholder="+33 X XXXX XXXX"
          icon={<Phone className="w-4 h-4 text-gray-400" />}
        />

        <CommonTextInput
          name="email"
          label="Email"
          form={form}
          placeholder="Email"
          icon={<Mail className="w-4 h-4 text-gray-400" />}
        />
      </div>
    </div>
  );
}
