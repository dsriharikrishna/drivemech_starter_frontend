import { Smartphone, Bell, Shield, CreditCard, History, Fingerprint } from "lucide-react";
import CustomCard from "@/components/ui/CustomCard";

export default function AppFeaturesSection() {
  const features = [
    {
      icon: <Fingerprint className="w-8 h-8 text-orange-500" />,
      title: "Live GPS Tracking",
      desc: "Track your service vehicle in real-time with precise GPS updates",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-orange-500" />,
      title: "One-Tap Booking",
      desc: "Request roadside assistance with a single tap from anywhere",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-orange-500" />,
      title: "Digital Payments",
      desc: "Secure in-app payments with Apple Pay, Google Pay, and cards",
    },
    {
      icon: <Bell className="w-8 h-8 text-orange-500" />,
      title: "Push Notifications",
      desc: "Get instant updates on driver status, ETA changes, and arrivals",
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "Secure & Private",
      desc: "Bank-level encryption to protect your personal information",
    },
    {
      icon: <History className="w-8 h-8 text-orange-500" />,
      title: "Service History",
      desc: "Access your complete service history and digital receipts",
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-gray-heading">
          Everything You Need in One App
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Download the DriveMech app for the fastest, most convenient way to request towing and roadside assistance.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {features.map((f, i) => (
            <CustomCard key={i} className="flex gap-4 p-5 border rounded-xl bg-white">
              <div className="bg-orange-50 p-3 rounded-xl">
                {f.icon}
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-gray-heading text-sm">{f.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{f.desc}</p>
              </div>
            </CustomCard>
          ))}
        </div>

      </div>
    </section>
  );
}
