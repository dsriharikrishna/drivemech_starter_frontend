"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare, Mail } from "lucide-react";
import SendEmailForm from "@/components/vendor/management/customers/send-email/SendEmailForm";
import SendSMSForm from "@/components/vendor/management/customers/send-sms/SendSMSForm";

type ExpandedSection = "send-sms" | "send-email" | null;

const SendEmailAndSMSPage = () => {
  const [expandedSection, setExpandedSection] =
    useState<ExpandedSection>("send-sms");

  const toggleSection = (section: ExpandedSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: "send-sms" as ExpandedSection,
      icon: MessageSquare,
      title: "Send SMS",
      renderContent: () => <SendSMSForm />,
    },
    {
      id: "send-email" as ExpandedSection,
      icon: Mail,
      title: "Send Email",
      renderContent: () => <SendEmailForm />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-4">
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === section.id;

            return (
              <div
                key={section.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                {/* Section Header */}
                <div
                  className={`w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    isExpanded ? "bg-blue-50 border-b border-gray-200" : ""
                  }`}
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-gray-900" />
                    <h2 className="text-base font-semibold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    {isExpanded ? (
                      <ChevronUp size={20} className="text-gray-600" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Section Content */}
                {isExpanded && (
                  <div className="bg-white">{section.renderContent()}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SendEmailAndSMSPage;
