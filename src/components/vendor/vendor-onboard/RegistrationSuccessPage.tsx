"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

const RegistrationSuccessPage: React.FC = () => {
  const router = useRouter();

  const handleGoToDashboard = useCallback(() => {
    router.push("/vendor/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  <span className="text-gray-900">Drive</span>
                  <span className="text-orange-500">Mech</span>
                </h1>
                <p className="text-xs text-gray-600">
                  Drive Smart, Service Smarter.
                </p>
              </div>
            </div>
          </div>

          {/* Location & User */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin size={18} className="text-orange-500" />
              <span className="text-sm font-medium">Hyderabad</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <span className="text-sm">🌐 Eng</span>
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={48} className="text-green-500" />
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Registration Successful! 🎉
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Thank you for completing your registration. Your application has
            been submitted successfully and is now under review by our team.
          </p>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Next Steps:
            </h3>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="font-semibold text-gray-900">1.</span>
                <span>
                  Our team will review your application within 24-48 hours
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-gray-900">2.</span>
                <span>
                  You'll receive a verification email with further instructions
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-gray-900">3.</span>
                <span>
                  Once approved, you can start using our platform services
                </span>
              </li>
            </ol>
          </div>

          {/* Action Button */}
          <Button
            variant="primary"
            onClick={handleGoToDashboard}
            className="px-8"
          >
            Go to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
};

export default RegistrationSuccessPage;
