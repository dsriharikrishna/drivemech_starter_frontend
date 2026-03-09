"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";

const Success = () => {
  const router = useRouter();

  return (
    <div className="h-full w-full pt-10 bg-[#f6f7fb] flex flex-col items-center justify-center px-4">
      <div className="w-full h-full max-w-4xl bg-white rounded-2xl py-10 px-6 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="text-white w-8 h-8" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Registration Successful! 🎉
        </h1>

        {/* Description */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Thank you for completing your registration. Your application has been
          submitted successfully and is now under review by our team.
        </p>

        {/* Next Steps */}
        <div className="bg-[#f3f6fb] rounded-xl p-6 max-w-3xl mx-auto text-left">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Next Steps:
          </h2>

          <ol className="space-y-3 text-gray-700 list-decimal list-inside text-sm">
            <li>Our team will review your application within 24–48 hours</li>
            <li>
              You'll receive a verification email with further instructions
            </li>
            <li>Once approved, you can start using our platform services</li>
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <Button onClick={() => router.push("/vendor/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
