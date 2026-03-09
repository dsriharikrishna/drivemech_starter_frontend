"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  smsCampaignSchema,
  emailCampaignSchema,
  SMSCampaignFormValues,
  EmailCampaignFormValues,
} from "@/schemas/vendor/campaigns.schema";
import CampaignStatsCard from "@/components/vendor/campaigns/CampaignStatsCard";
import SMSCampaignForm from "@/components/vendor/campaigns/SMSCampaignForm";
import EmailCampaignForm from "@/components/vendor/campaigns/EmailCampaignForm";
import Tabs from "@/components/ui/Tabs";
import { Megaphone, Send, Users } from "lucide-react";
import { ActiveUsersIcon, MessagesSentIcon, VoiceCampaignIcon } from "@/components/icons/campaignIcons";

const CampaignsLayout = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"sms" | "email">("sms");

  // SMS Form
  const smsMethods = useForm<SMSCampaignFormValues>({
    resolver: zodResolver(smsCampaignSchema),
    defaultValues: {
      campaignName: "",
      audience: "",
      message: "",
      schedule: "",
    },
    mode: "onChange",
  });

  // Email Form
  const emailMethods = useForm<EmailCampaignFormValues>({
    resolver: zodResolver(emailCampaignSchema),
    defaultValues: {
      campaignName: "",
      subjectLine: "",
      audience: "",
      emailContent: "",
      schedule: "",
    },
    mode: "onChange",
  });

  const onSMSSubmit = useCallback(
    (data: SMSCampaignFormValues) => {
      console.log("SMS Campaign Data:", data);
      smsMethods.reset();
    },
    [smsMethods]
  );

  const onEmailSubmit = useCallback(
    (data: EmailCampaignFormValues) => {
      console.log("Email Campaign Data:", data);
      emailMethods.reset();
    },
    [emailMethods]
  );

  const handleAudienceClick = useCallback(() => {
    router.push("/vendor/campaigns/audience");
  }, [router]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId as "sms" | "email");
  }, []);

  return (
    <div className="w-full h-full p-0">
      <div className="flex flex-col gap-4 ">
        {/* Header */}
        <div className="bg-blue-50 rounded-xl p-4">
          <h1 className="text-base font-bold text-gray-900 mb-0.5">
            SMS & Email Campaigns
          </h1>
          <p className="text-xs text-gray-600">
            Create and manage marketing campaigns for your customers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <CampaignStatsCard
            icon={<VoiceCampaignIcon size={48} />}
            value="48"
            label="Total Campaigns"
            bgColor="bg-purple-100"
          />
          <CampaignStatsCard
            icon={<MessagesSentIcon size={48} />}
            value="12,876"
            label="Messages Sent"
            bgColor="bg-green-100"
          />
          <CampaignStatsCard
            icon={<ActiveUsersIcon size={48} />}
            value="3,456"
            label="Active Customers"
            bgColor="bg-orange-100"
          />
        </div>

        {/* Create New Campaign */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              Create New Campaign
            </h2>
            <button
              onClick={handleAudienceClick}
              className="px-3 py-1.5 cursor-pointer bg-gray-200 text-gray-900 font-semibold rounded-lg text-xs hover:bg-gray-200 transition-colors"
            >
              Audience
            </button>
          </div>

          {/* Tabs */}
          <Tabs
            tabs={[
              { id: "sms", label: "SMS Campaign" },
              { id: "email", label: "Email Campaign" },
            ]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Form Content */}
          {activeTab === "sms" ? (
            <FormProvider {...smsMethods}>
              <form onSubmit={smsMethods.handleSubmit(onSMSSubmit)}>
                <SMSCampaignForm />
              </form>
            </FormProvider>
          ) : (
            <FormProvider {...emailMethods}>
              <form onSubmit={emailMethods.handleSubmit(onEmailSubmit)}>
                <EmailCampaignForm />
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignsLayout;
