"use client"
import AddressCard from "@/components/customer/workshop/AddressCard";
import BookNowBar from "@/components/customer/workshop/BookNowBar";
import MechanicCard from "@/components/customer/workshop/MechanicCard";
import ReviewItem from "@/components/customer/workshop/ReviewItem";
import ReviewSummaryCard from "@/components/customer/workshop/ReviewSummaryCard";
import ServiceFeaturesCard from "@/components/customer/workshop/ServiceFeaturesCard";
import ServiceHeaderCard from "@/components/customer/workshop/ServiceHeaderCard";
import TopRecommendedWorkshops from "@/components/customer/workshop/TopRecommendedWorkshops";
import WorkShopHeader from "@/components/customer/workshop/WorkShopHeader";
import LeftLayout from "@/components/Layout/LeftLayout";
import RightLayout from "@/components/Layout/RightLayout";
import { ArrowLeft } from "phosphor-react";

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


export const WorkShopLayout = () => {
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col gap-4">

      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-2">
        <div className="mx-auto flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Select Service</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <LeftLayout>
          {/* Header */}
          <WorkShopHeader
            title="5 car mechanics in near Madhapur"
            location="Madhapur"
          />
          <TopRecommendedWorkshops />
          <div className="space-y-5 flex flex-col gap-2">

            {/* Card #1 */}
            <MechanicCard
              logo="/garage-logo.png"
              name="A to Z Services"
              status="Open • Closes 9:30 PM"
              distance="3.4 km"
              ratings="4.5"
              reviews="120+"
              tags={tags}
              highlights={highlights}
              services={sampleServices}
              onBookNow={() => alert("Book Now Clicked")}
            />
          </div>
        </LeftLayout>
        <RightLayout>
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-2 bg-white p-2  rounded-2xl">
              <ServiceHeaderCard />
              <ServiceFeaturesCard />
            </div>
            <AddressCard />
            <ReviewSummaryCard />

            {/* Reviews */}
            <div className="bg-white rounded-xl p-5 shadow-sm border-border">
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

              <BookNowBar />
            </div>
          </div>
        </RightLayout>
      </div>
    </div>
  )
}