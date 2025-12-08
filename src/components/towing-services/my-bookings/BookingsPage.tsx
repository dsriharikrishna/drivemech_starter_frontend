"use client";

import { useState } from "react";
import CustomCard from "@/components/ui/CustomCard"; // :contentReference[oaicite:0]{index=0}
import Button from "@/components/ui/Button";         // :contentReference[oaicite:1]{index=1}
import Avatar from "@/components/ui/Avatar";         // :contentReference[oaicite:2]{index=2}
import { Phone, Receipt } from "lucide-react";
import Divider from "@/components/ui/Divider";

// Mock Data (You can replace with API data)
const bookings = {
  active: [
    {
      id: "DM-2025-6721",
      date: "Oct 20, 2025 at 10:15 AM",
      status: "Active",
      price: "$65",
      driver: {
        name: "Michael Rodriguez",
        rating: "4.5",
        trips: "342 Trips",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      pickup: "123 Main Road, NH-123, Hyderabad-54",
      destination: "Joe’s Auto Repair, ABC Road, Secunderabad",
      vehicle: "Honda Accord (XYZ-5678)",
    },
  ],
  completed: [
    {
      id: "DM-2025-6721",
      date: "Oct 20, 2025 at 10:15 AM",
      status: "Completed",
      price: "$65",
      driver: {
        name: "Michael Rodriguez",
        rating: "4.5",
        trips: "342 Trips",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      pickup: "123 Main Road, NH-123, Hyderabad-54",
      destination: "Joe’s Auto Repair, ABC Road, Secunderabad",
      vehicle: "Honda Accord (XYZ-5678)",
    },
    // Duplicate to show 3 cards
    {
      id: "DM-2025-6722",
      date: "Oct 20, 2025 at 10:15 AM",
      status: "Completed",
      price: "$65",
      driver: {
        name: "Michael Rodriguez",
        rating: "4.5",
        trips: "342 Trips",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      pickup: "123 Main Road, NH-123, Hyderabad-54",
      destination: "Joe’s Auto Repair, ABC Road, Secunderabad",
      vehicle: "Honda Accord (XYZ-5678)",
    },
    {
      id: "DM-2025-6723",
      date: "Oct 20, 2025 at 10:15 AM",
      status: "Completed",
      price: "$65",
      driver: {
        name: "Michael Rodriguez",
        rating: "4.5",
        trips: "342 Trips",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      pickup: "123 Main Road, NH-123, Hyderabad-54",
      destination: "Joe’s Auto Repair, ABC Road, Secunderabad",
      vehicle: "Honda Accord (XYZ-5678)",
    },
  ],
  cancelled: [
    {
      id: "DM-2025-6721",
      date: "Oct 20, 2025 at 10:15 AM",
      status: "Cancelled",
      price: "$65",
      driver: {
        name: "Michael Rodriguez",
        rating: "4.5",
        trips: "342 Trips",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      pickup: "123 Main Road, NH-123, Hyderabad-54",
      destination: "Joe’s Auto Repair, ABC Road, Secunderabad",
      vehicle: "Honda Accord (XYZ-5678)",
    },
  ],
};

export default function BookingsPage() {
  const [tab, setTab] = useState<"active" | "completed" | "cancelled">("active");

  const getStatusBadge = (status: string) => {
    if (status === "Active")
      return <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">● Active</span>;
    if (status === "Completed")
      return <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">✓ Completed</span>;
    return <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">✕ Cancelled</span>;
  };

  const data = bookings[tab];

  return (
    <section className="w-full py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* PAGE TITLE */}
        <h2 className="text-gray-heading text-3xl font-semibold">My Bookings</h2>
        <p className="text-gray-600 text-sm mt-1">Manage and track all your towing services</p>

        {/* TAB BAR + NEW BOOKING BUTTON */}
        <div className="flex justify-end items-center mt-6 gap-4">
          <div className="flex gap-3 bg-white border border-gray-200 rounded-full px-2 py-1">

            <button
              onClick={() => setTab("active")}
              className={`px-4 py-1 rounded-full text-sm ${
                tab === "active" ? "bg-orange-500 text-white" : "text-gray-600"
              }`}
            >
              Active Bookings (1)
            </button>

            <button
              onClick={() => setTab("completed")}
              className={`px-4 py-1 rounded-full text-sm ${
                tab === "completed" ? "bg-orange-500 text-white" : "text-gray-600"
              }`}
            >
              Completed (3)
            </button>

            <button
              onClick={() => setTab("cancelled")}
              className={`px-4 py-1 rounded-full text-sm ${
                tab === "cancelled" ? "bg-orange-500 text-white" : "text-gray-600"
              }`}
            >
              Cancelled Bookings (1)
            </button>
          </div>

          <Button variant="gradient" className="px-4 py-2 rounded-md text-sm">
            + New Booking
          </Button>
        </div>

        {/* BOOKINGS GRID */}
        <div
          className={`mt-8 grid gap-6 ${
            tab === "completed" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          }`}
        >
          {data.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-5">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-gray-heading font-semibold text-sm">
                  Booking #{item.id}
                </h3>
                {getStatusBadge(item.status)}
              </div>

              <p className="text-gray-500 text-xs mb-3">{item.date}</p>

              {/* DRIVER */}
              <div className="flex items-center gap-3 mt-2 mb-3">
                <Avatar src={item.driver.avatar} size="md" className="rounded-full" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.driver.name}</p>
                  <p className="text-gray-500 text-xs">⭐ {item.driver.rating} • {item.driver.trips}</p>
                </div>

                <span className="ml-auto text-orange-600 font-semibold">{item.price}</span>
              </div>

              <Divider />

              {/* PICKUP */}
              <div className="mb-2">
                <p className="font-semibold text-gray-800 text-sm">Pickup</p>
                <p className="text-gray-600 text-xs">{item.pickup}</p>
              </div>

              {/* DESTINATION */}
              <div className="mb-2">
                <p className="font-semibold text-gray-800 text-sm">Destination</p>
                <p className="text-gray-600 text-xs">{item.destination}</p>
              </div>

              {/* VEHICLE */}
              <div className="bg-gray-50 p-3 rounded-xl mt-2">
                <p className="font-semibold text-gray-700 text-xs">Vehicle</p>
                <p className="text-gray-600 text-xs">{item.vehicle}</p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-5">

                {item.status === "Completed" && (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1 justify-center text-sm"
                    >
                      <Receipt className="w-4 h-4 mr-2" />
                      View Receipt
                    </Button>

                    <Button variant="gradient" className="flex-1 text-sm">
                      Book Again
                    </Button>
                  </>
                )}

                {item.status === "Active" && (
                  <>
                    <Button variant="gradient" className="flex-1 text-sm">
                      Track Live
                    </Button>

                    <Button variant="outline" className="p-2">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {item.status === "Cancelled" && (
                  <Button variant="gradient" className="w-full text-sm">
                    Book Again
                  </Button>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
