"use client";

import React from "react";
import Button from "@/components/ui/Button";
import CustomCard from "@/components/ui/CustomCard";
import { Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { RegisterFormData } from "@/schemas/partner.schemas";

interface PartnerSuccessPageProps {
  data: RegisterFormData;
  onBack?: () => void;
}

export default function PartnerSuccessPage({ data, onBack }: PartnerSuccessPageProps) {
  const referenceNumber = `PA-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="w-full bg-white px-4 py-24">
      <div className="max-w-7xl mx-auto flex flex-col">

        {/* ---------------- TWO-COLUMN MAIN LAYOUT ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

          {/* LEFT SIDE CONTENT */}
          <div className="flex flex-col gap-12">
            {/* ---------------- SUCCESS HEADER ---------------- */}
            <div className="flex flex-col items-center text-center gap-6 mb-20">
              <img src="/images/towing-services/partners/RightCheck.png" alt="Success" className="w-20 h-20" />

              <h2 className="text-[26px] font-semibold text-gray-heading">
                Application Submitted Successfully!
              </h2>

              <p className="text-gray-600 text-sm max-w-xl">
                Thank you for your interest in becoming a DriveMech partner.
                We’re excited to review your application and help grow your business.
              </p>

              <CustomCard className="border border-orange-200 bg-orange-50 rounded-xl p-6 text-center max-w-sm">
                <p className="text-gray-heading text-sm font-semibold">Application Reference</p>
                <p className="text-orange-600 font-semibold text-lg mt-1">#{referenceNumber}</p>
                <p className="text-gray-600 text-xs mt-2">
                  Confirmation sent to <span className="font-medium text-gray-700">{data.email}</span>
                </p>
              </CustomCard>

              <Button variant="gradient" className="px-8 mt-2" onClick={onBack}>
                Back to Partner Page
              </Button>
            </div>

            {/* --------- APPLICATION PROCESS --------- */}
            <CustomCard className="p-8 border rounded-2xl">
              <h3 className="text-gray-heading font-semibold text-[18px] mb-6">
                Application Process
              </h3>

              <div className="flex flex-col gap-0">

                {/* STEP 1 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="w-[2px] h-14 bg-green-300"></span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-heading">Application Review</p>
                    <p className="text-xs text-gray-500">
                      Our team will review your application within 24 hours
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full h-fit">
                    Within 24 hours
                  </span>
                </div>

                {/* STEP 2 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                    <span className="w-[2px] h-14 bg-gray-200"></span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-heading">Phone Interview</p>
                    <p className="text-xs text-gray-500">
                      Schedule a call with our partnership team
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full h-fit">
                    2–3 business days
                  </span>
                </div>

                {/* STEP 3 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                    <span className="w-[2px] h-14 bg-gray-200"></span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-heading">Documentation</p>
                    <p className="text-xs text-gray-500">
                      Submit insurance, licenses, and vehicle information
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full h-fit">
                    3–5 business days
                  </span>
                </div>

                {/* STEP 4 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-heading">Onboarding</p>
                    <p className="text-xs text-gray-500">
                      Complete training and start accepting jobs
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full h-fit">
                    1 Week
                  </span>
                </div>

              </div>
            </CustomCard>

            {/* --------- HELPFUL RESOURCES --------- */}
            <CustomCard className="p-5 border  rounded-2xl">
              <h3 className="text-gray-heading font-semibold text-[18px] mb-6">
                Helpful Resources
              </h3>

              <div className="flex flex-col gap-5">

                {/* Resource 1 */}
                <div className="flex justify-between items-center border border-border rounded-xl p-5 bg-white hover:bg-gray-50 cursor-pointer">
                  <div>
                    <p className="font-semibold text-gray-heading text-sm">Partner Guide</p>
                    <p className="text-xs text-gray-500">Complete guide to becoming a DriveMech partner</p>
                  </div>
                  <ArrowRight className="text-gray-500 w-4" />
                </div>

                {/* Resource 2 */}
                <div className="flex justify-between items-center border border-border rounded-xl p-5 bg-white hover:bg-gray-50 cursor-pointer">
                  <div>
                    <p className="font-semibold text-gray-heading text-sm">Requirement Checklist</p>
                    <p className="text-xs text-gray-500">Ensure you have all necessary documentation</p>
                  </div>
                  <ArrowRight className="text-gray-500 w-4" />
                </div>

                {/* Resource 3 */}
                <div className="flex justify-between items-center border border-border rounded-xl p-5 bg-white hover:bg-gray-50 cursor-pointer">
                  <div>
                    <p className="font-semibold text-gray-heading text-sm">Success Stories</p>
                    <p className="text-xs text-gray-500">Learn from other partners’ experiences</p>
                  </div>
                  <ArrowRight className="text-gray-500 w-4" />
                </div>

              </div>
            </CustomCard>

          </div>

          {/* RIGHT SIDE SUMMARY PANEL */}
          <div className="flex flex-col gap-8">

            {/* Application Summary */}
            <CustomCard className="p-8 border rounded-2xl">
              <h3 className="text-gray-heading font-semibold text-[18px] mb-4">
                Application Summary
              </h3>

              <div className="text-sm space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Company Name</span>
                  <span className="font-medium text-gray-heading">{data.company}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Contact Person</span>
                  <span className="font-medium text-gray-heading">{data.contactName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-gray-heading">{data.email}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium text-gray-heading">{data.phoneNumber}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Submitted On</span>
                  <span className="font-medium text-gray-heading">{currentDate}</span>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm font-medium text-blue-600">What Happens Next?</p>
                <p className="text-xs text-blue-600 mt-1">
                  Our partnership team will review your application and contact you within 24 hours.
                </p>
              </div>
            </CustomCard>

            {/* Need Help */}
            <CustomCard className="p-8 border rounded-2xl">
              <p className="font-semibold text-gray-heading text-[16px] mb-5">Need Help?</p>

              <div className="flex flex-col gap-3">

                <div className="flex items-center gap-2 border border-orange-300 px-4 py-2 rounded-lg text-orange-600 cursor-pointer">
                  <MessageCircle className="w-4" />
                  Chat with partnership team
                </div>

                <div className="flex items-center gap-2 border border-orange-300 px-4 py-2 rounded-lg text-orange-600 cursor-pointer">
                  <Phone className="w-4" />
                  Call 1-800-PARTNERS
                </div>

                <div className="flex items-center gap-2 border border-orange-300 px-4 py-2 rounded-lg text-orange-600 cursor-pointer">
                  <Mail className="w-4" />
                  Email Us
                </div>

              </div>

              <div className="mt-5 text-xs text-gray-600">
                <p className="font-medium">Partnership Office Hours</p>
                <p className="mt-1">Mon – Fri • 9 AM – 6 PM IST</p>
              </div>
            </CustomCard>

          </div>

        </div>
      </div>
    </section>
  );
}
