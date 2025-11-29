"use client"
import MechanicCard from "@/components/customer/workshop/MechanicCard";
import TopRecommendedWorkshops from "@/components/customer/workshop/TopRecommendedWorkshops";
import WorkShopHeader from "@/components/customer/workshop/WorkShopHeader";

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
  return (
    <div className="p-4 max-w-5xl mx-auto flex flex-col gap-2">

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
    </div>

  )
}

