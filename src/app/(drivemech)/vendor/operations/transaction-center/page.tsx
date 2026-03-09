"use client";

import React, { useState } from "react";
import StatsSection from "@/components/vendor/transaction-center/dashboard/StatsSection";
import UnderServicingSection from "@/components/vendor/transaction-center/dashboard/UnderServicingSection";
import { ServiceRequest } from "@/lib/schemas/transaction-center";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import ServiceRequestsCard from "@/components/vendor/transaction-center/dashboard/ServiceRequestsCard";

export default function TransactionCenterPage() {
  const [bookingEnabled, setBookingEnabled] = useState(true);

  const underServicingRequests: ServiceRequest[] = [
    {
      id: "1",
      orderId: "TS09FJ0007",
      customerName: "Ramesh Babu",
      phoneNumber: "70007 70007",
      vehicleMake: "BMW X7",
      vehicleModel: "2024 I SUV",
      vehicleRegNo: "TS09FJ0007",
      serviceType: "Periodic Service",
      status: "In Progress",
      date: new Date(),
      year: "2024",
      fuelType: "Petrol",
      kmReading: "20000",
      fuelLevel: "Empty",
      supervisor: "John",
      technician: "Suresh",
    },
    {
      id: "2",
      orderId: "TS09FJ0008",
      customerName: "Ramesh Babu",
      phoneNumber: "70007 70007",
      vehicleMake: "BMW X7",
      vehicleModel: "2024 I SUV",
      vehicleRegNo: "TS09FJ0008",
      serviceType: "Periodic Service",
      status: "In Progress",
      date: new Date(),
      year: "2024",
      fuelType: "Diesel",
      kmReading: "20000",
      fuelLevel: "Empty",
      supervisor: "John",
      technician: "Suresh",
    },
  ];

  const newServiceRequests: ServiceRequest[] = [
    {
      id: "101",
      orderId: "ORD-001",
      customerName: "John Smith",
      phoneNumber: "1234567890",
      email: "johnsmith@gmail.com",
      vehicleMake: "BMW X7",
      vehicleModel: "ABC 007 K",
      vehicleRegNo: "ABC 007 K",
      serviceType: "Periodic",
      modeOfService: "Walk-In",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
    {
      id: "102",
      orderId: "ORD-002",
      customerName: "Daniel Danny",
      phoneNumber: "9876543210",
      email: "danieldanny@gmail.com",
      vehicleMake: "Toyota Camry",
      vehicleModel: "1 ABC 234",
      vehicleRegNo: "1 ABC 234",
      serviceType: "Oil Change",
      modeOfService: "Pick-Up",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
    {
      id: "103",
      orderId: "ORD-003",
      customerName: "John Smith",
      phoneNumber: "1234567890",
      email: "johnsmith@gmail.com",
      vehicleMake: "BMW X7",
      vehicleModel: "ABC 007 K",
      vehicleRegNo: "ABC 007 K",
      serviceType: "Periodic",
      modeOfService: "Walk-In",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
    {
      id: "104",
      orderId: "ORD-004",
      customerName: "Daniel Danny",
      phoneNumber: "9876543210",
      email: "danieldanny@gmail.com",
      vehicleMake: "Toyota Camry",
      vehicleModel: "1 ABC 234",
      vehicleRegNo: "1 ABC 234",
      serviceType: "Oil Change",
      modeOfService: "Pick-Up",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
    {
      id: "105",
      orderId: "ORD-005",
      customerName: "John Smith",
      phoneNumber: "1234567890",
      email: "johnsmith@gmail.com",
      vehicleMake: "BMW X7",
      vehicleModel: "ABC 007 K",
      vehicleRegNo: "ABC 007 K",
      serviceType: "Periodic",
      modeOfService: "Walk-In",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-4">
      <div className="max-w-7xl mx-auto">
        {/* Booking Management Control */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-2">
          <h1 className="text-lg font-semibold text-gray-800">
            Booking Management Control
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">
              Disable Booking
            </span>
            <ToggleSwitch
              label=""
              checked={bookingEnabled}
              onChange={setBookingEnabled}
            />
            <span
              className={`text-sm font-medium px-3 py-1 rounded-md ${bookingEnabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {bookingEnabled ? "Booking Available" : "Booking Disabled"}
            </span>
          </div>
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Under Servicing Section */}
          <div className="flex-2">
            <UnderServicingSection requests={underServicingRequests} />
          </div>

          {/* New Services Table */}
          <div className="flex-1">
            <ServiceRequestsCard requests={newServiceRequests} />
          </div>
        </div>
      </div>
    </div>
  );
}
