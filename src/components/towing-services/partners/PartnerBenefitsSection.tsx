import CustomCard from "@/components/ui/CustomCard";
import { Wallet, BarChart, ShieldCheck, Timer, Users, Award } from "lucide-react";

export function PartnerBenefitsSection() {
  const benefits = [
    {
      icon: <Wallet className="w-6 h-6 text-orange-500" />,
      title: "Competitive Revenue",
      desc: "Earn top rates with guaranteed payouts",
    },
    {
      icon: <BarChart className="w-6 h-6 text-orange-500" />,
      title: "Business Analytics",
      desc: "Real-time dashboards and insights",
    },
    {
      icon: <Timer className="w-6 h-6 text-orange-500" />,
      title: "Flexible Scheduling",
      desc: "Control your availability and service areas",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
      title: "Insurance Coverage",
      desc: "Comprehensive liability + vehicle protection",
    },
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: "Dedicated Support",
      desc: "24/7 partner success team",
    },
    {
      icon: <Award className="w-6 h-6 text-orange-500" />,
      title: "Performance Bonuses",
      desc: "Extra earnings for top-rated partners",
    },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">

        <h2 className="text-2xl font-semibold text-gray-heading">
          Partner Benefits & Support
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Everything you need to succeed as a DriveMech partner
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {benefits.map((b, i) => (
            <CustomCard key={i} className="flex gap-4 p-4 border rounded-xl">
              <div className="bg-orange-50 p-3 rounded-lg">{b.icon}</div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-heading text-sm">{b.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{b.desc}</p>
              </div>
            </CustomCard>
          ))}
        </div>

      </div>
    </section>
  );
}
