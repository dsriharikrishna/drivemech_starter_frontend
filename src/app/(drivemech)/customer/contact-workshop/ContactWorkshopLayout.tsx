"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { ArrowLeft, Phone, Envelope, MapPin, Clock } from "phosphor-react";
import { SmoothLandingBox } from "@/components/animations/SmoothLandingBox";
import Avatar from "@/components/ui/Avatar";

const ContactWorkshopLayout = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // TODO: Implement API call to send message
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    alert("Message sent successfully!");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <SmoothLandingBox variant="fade" duration={0.6}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Contact Workshop
            </h1>
          </div>
        </SmoothLandingBox>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workshop Info - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <SmoothLandingBox variant="slide-right" delay={0.1} distance={30}>
              {/* Workshop Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar
                    src="/images/workshop-placeholder.jpg"
                    alt="Workshop"
                    className="w-16 h-16 rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      AutoCare Center
                    </h2>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-700">
                        4.8
                      </span>
                      <span className="text-sm text-gray-500">
                        (245 reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Phone</p>
                      <a
                        href="tel:+919876543210"
                        className="text-sm font-medium text-gray-900 hover:text-orange-500"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Envelope size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <a
                        href="mailto:contact@autocare.com"
                        className="text-sm font-medium text-gray-900 hover:text-orange-500 break-all"
                      >
                        contact@autocare.com
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Address</p>
                      <p className="text-sm font-medium text-gray-900">
                        123 Main Street, Sector 15, Hyderabad, Telangana 500001
                      </p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Working Hours
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        Mon - Sat: 9:00 AM - 7:00 PM
                      </p>
                      <p className="text-sm text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </SmoothLandingBox>

            <SmoothLandingBox variant="slide-right" delay={0.15} distance={30}>
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    startIcon={<Phone size={18} />}
                  >
                    Call Workshop
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    startIcon={<MapPin size={18} />}
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </SmoothLandingBox>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-2">
            <SmoothLandingBox variant="slide-left" delay={0.1} distance={30}>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="What is this regarding?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      rows={8}
                    />
                  </div>

                  {/* Info Text */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> The workshop typically responds
                      within 24 hours. For urgent matters, please call them
                      directly.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </div>
            </SmoothLandingBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWorkshopLayout;
