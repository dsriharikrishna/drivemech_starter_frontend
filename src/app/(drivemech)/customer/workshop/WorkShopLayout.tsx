"use client";

import AddressCard from "@/components/customer/workshop/AddressCard";
import MechanicCard from "@/components/customer/workshop/MechanicCard";
import ReviewItem from "@/components/customer/workshop/ReviewItem";
import ReviewSummaryCard from "@/components/customer/workshop/ReviewSummaryCard";
import ServiceFeaturesCard from "@/components/customer/workshop/ServiceFeaturesCard";
import ServiceHeaderCard from "@/components/customer/workshop/ServiceHeaderCard";
import TopRecommendedWorkshops from "@/components/customer/workshop/TopRecommendedWorkshops";
import WorkShopHeader from "@/components/customer/workshop/WorkShopHeader";
import LeftLayout from "@/components/Layout/LeftLayout";
import RightLayout from "@/components/Layout/RightLayout";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const sampleServices = [
  { title: "Engine Oil Replacement", price: "$25" },
  { title: "Basic Inspection Report", price: "$15" },
  { title: "Pickup & Return", price: "$Free" },
];

const highlights = [
  "Full diagnostic check",
  "AC & Cooling system check",
  "Brake performance inspection",
];

const tags = [
  "Car Wash",
  "AC Service",
  "Puncture",
  "Battery",
  "Tyre",
  "Suspension",
];

const workshops = [
  {
    id: "workshop_123",
    logo: "/garage-logo.png",
    name: "A to Z Services",
    status: "Open • Closes 9:30 PM",
    distance: "3.4 km",
    ratings: "4.5",
    reviews: "120+",
  },
  {
    id: "workshop_456",
    logo: "/garage-logo.png",
    name: "Speed Auto Care",
    status: "Open • Closes 10:00 PM",
    distance: "2.1 km",
    ratings: "4.2",
    reviews: "98+",
  },
  {
    id: "workshop_789",
    logo: "/garage-logo.png",
    name: "Rapid Fix Garage",
    status: "Open • Closes 8:45 PM",
    distance: "4.0 km",
    ratings: "4.8",
    reviews: "210+",
  },
];

export const WorkShopLayout = () => {
  const router = useRouter();

  const [selectedWorkShop, setSelectedWorkShop] = useState<{
    name: string;
    id: string;
  } | null>(null);

  const handleBook = useCallback(
    (name: string, id: string) => {
      const selected = { name, id };
      setSelectedWorkShop(selected);

      
      router.push("/customer/select-service");
    },
    [router]
  );

  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <LeftLayout>
          <WorkShopHeader
            title="5 car mechanics in near Madhapur"
            location="Madhapur"
          />
          <TopRecommendedWorkshops />

          <div className="space-y-5 flex flex-col gap-2">
            {workshops.map((workshop) => (
              <MechanicCard
                key={workshop.id}
                {...workshop}
                tags={tags}
                highlights={highlights}
                services={sampleServices}
                onBookNow={handleBook}
                isActive={selectedWorkShop?.id === workshop.id}
              />
            ))}
          </div>
        </LeftLayout>

        <RightLayout>
          <div className="flex flex-col gap-4 bg-white p-2 rounded-2xl">
            <div className="flex flex-col gap-2">
              <ServiceHeaderCard />
              <ServiceFeaturesCard />
            </div>

            <AddressCard />
            <ReviewSummaryCard />

            <div className="bg-white rounded-xl p-5">
              <ReviewItem
                name="Courtney Henry"
                time="2 mins ago"
                rating={5}
                review="Consequatur velit quod ad deserunt cum..."
              />

              <ReviewItem
                name="Cameron Williamson"
                time="5 mins ago"
                rating={4}
                review="Lorem ipsum dolor sit amet..."
              />

              <Button variant="primary" className="w-full rounded-lg">
                Book Now
              </Button>
            </div>
          </div>
        </RightLayout>
      </div>
    </div>
  );
};
