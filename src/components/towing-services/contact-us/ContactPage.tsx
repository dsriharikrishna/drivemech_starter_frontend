"use client";

import Button from "@/components/ui/Button"; // :contentReference[oaicite:0]{index=0}
import CommonTextInput from "@/components/forms/CommonTextInput"; // :contentReference[oaicite:1]{index=1}
import CommonTextArea from "@/components/forms/CommonTextArea"; // :contentReference[oaicite:2]{index=2}
import { FormProvider, useForm } from "react-hook-form";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <section className="w-full py-14">
      <div className="max-w-6xl mx-auto px-4">

        {/* PAGE HEADING */}
        <h2 className="text-gray-heading text-3xl font-semibold text-center">
          Contact Us
        </h2>
        <p className="text-gray-600 text-sm text-center mt-2">
          We’re here to help 24/7. Reach out anytime.
        </p>

        {/* LAYOUT WRAPPER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

          {/* CONTACT FORM */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

            <h3 className="text-xl font-semibold text-gray-heading mb-4">
              Send Us a Message
            </h3>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">

                {/* Name */}
                <CommonTextInput
                  name="name"
                  label="Full Name"
                  placeholder="Enter your name"
                />

                {/* Email */}
                <CommonTextInput
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  leftIcon={<Mail className="w-4 text-gray-400" />}
                />

                {/* Phone */}
                <CommonTextInput
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  type="text"
                  leftIcon={<Phone className="w-4 text-gray-400" />}
                />

                {/* Message */}
                <CommonTextArea
                  name="message"
                  label="Message"
                  placeholder="Write your message"
                  rows={4}
                />

                {/* Button */}
                <Button type="submit" variant="gradient" fullWidth className="mt-3">
                  Send Message
                </Button>

              </form>
            </FormProvider>
          </div>

          {/* CONTACT INFO PANEL */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-6">

            <div>
              <h3 className="text-xl font-semibold text-gray-heading">
                Contact Information
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Our support team is available 24/7 to assist you.
              </p>
            </div>

            {/* Info Items */}
            <div className="flex items-start gap-3">
              <Mail className="w-5 text-orange-500" />
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-gray-600 text-sm">support@towservice.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 text-orange-500" />
              <div>
                <p className="font-medium text-gray-800">Phone</p>
                <p className="text-gray-600 text-sm">+1 800 123 4567</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 text-orange-500" />
              <div>
                <p className="font-medium text-gray-800">Address</p>
                <p className="text-gray-600 text-sm">
                  123 Tow Street, Dallas, TX, USA
                </p>
              </div>
            </div>

            {/* MAP */}
            <div className="w-full h-56 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
              Google Map Placeholder
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
