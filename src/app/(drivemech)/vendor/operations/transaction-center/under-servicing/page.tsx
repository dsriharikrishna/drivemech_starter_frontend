"use client";

import React from "react";
import { ServiceRequest } from "@/lib/schemas/transaction-center";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import ServiceRequestTable from "@/components/vendor/ServiceRequestTable";

export default function UnderServicingPage() {
  const router = useRouter();

  // Mock Data for Under Servicing
  const underServicingRequests: ServiceRequest[] = [
    {
      id: "201",
      orderId: "ORD-201",
      customerName: "Sarah Johnson",
      phoneNumber: "1234567890",
      email: "sarah.johnson@gmail.com",
      vehicleMake: "Mercedes-Benz C-Class",
      vehicleModel: "C 300",
      vehicleRegNo: "TS10AB1234",
      serviceType: "Major Service",
      modeOfService: "Walk-In",
      status: "Under Servicing",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "10:00 AM - 12:00 PM",
    },
    {
      id: "202",
      orderId: "ORD-202",
      customerName: "Michael Brown",
      phoneNumber: "9876543210",
      email: "michael.brown@gmail.com",
      vehicleMake: "Audi A4",
      vehicleModel: "A4 Premium",
      vehicleRegNo: "TS11CD5678",
      serviceType: "Oil Change",
      modeOfService: "Pick-Up",
      status: "Under Servicing",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "2:00 PM - 4:00 PM",
    },
    {
      id: "203",
      orderId: "ORD-203",
      customerName: "Emily Davis",
      phoneNumber: "5551234567",
      email: "emily.davis@gmail.com",
      vehicleMake: "BMW 5 Series",
      vehicleModel: "530i",
      vehicleRegNo: "TS12EF9012",
      serviceType: "Brake Service",
      modeOfService: "Walk-In",
      status: "Under Servicing",
      date: "Friday, 9 Aug 2025",
      timeSlot: "9:00 AM - 11:00 AM",
    },
    {
      id: "204",
      orderId: "ORD-204",
      customerName: "David Wilson",
      phoneNumber: "5559876543",
      email: "david.wilson@gmail.com",
      vehicleMake: "Toyota Fortuner",
      vehicleModel: "Fortuner 4x4",
      vehicleRegNo: "TS13GH3456",
      serviceType: "Tire Replacement",
      modeOfService: "Pick-Up",
      status: "Under Servicing",
      date: "Friday, 9 Aug 2025",
      timeSlot: "1:00 PM - 3:00 PM",
    },
    {
      id: "205",
      orderId: "ORD-205",
      customerName: "Jessica Martinez",
      phoneNumber: "5556789012",
      email: "jessica.martinez@gmail.com",
      vehicleMake: "Honda CR-V",
      vehicleModel: "CR-V EX",
      vehicleRegNo: "TS14IJ7890",
      serviceType: "General Inspection",
      modeOfService: "Walk-In",
      status: "Under Servicing",
      date: "Saturday, 10 Aug 2025",
      timeSlot: "11:00 AM - 1:00 PM",
    },
    {
      id: "206",
      orderId: "ORD-206",
      customerName: "Robert Taylor",
      phoneNumber: "5554567890",
      email: "robert.taylor@gmail.com",
      vehicleMake: "Hyundai Tucson",
      vehicleModel: "Tucson Limited",
      vehicleRegNo: "TS15KL2345",
      serviceType: "Engine Tune-up",
      modeOfService: "Pick-Up",
      status: "Under Servicing",
      date: "Saturday, 10 Aug 2025",
      timeSlot: "3:00 PM - 5:00 PM",
    },
    {
      id: "207",
      orderId: "ORD-207",
      customerName: "Amanda Anderson",
      phoneNumber: "5553456789",
      email: "amanda.anderson@gmail.com",
      vehicleMake: "Volkswagen Tiguan",
      vehicleModel: "Tiguan SEL",
      vehicleRegNo: "TS16MN6789",
      serviceType: "AC Service",
      modeOfService: "Walk-In",
      status: "Under Servicing",
      date: "Sunday, 11 Aug 2025",
      timeSlot: "10:00 AM - 12:00 PM",
    },
  ];

  return (
    <ServiceRequestTable
      data={underServicingRequests}
      basePath="/vendor/operations/transaction-center/under-servicing"
      title="Under Servicing"
      titleBgColor="bg-orange-500"
      actionButtons={[
        {
          label: "View Details",
          icon: Eye,
          variant: "primary",
          onClick: (item) => {
            router.push(
              `/vendor/operations/transaction-center/under-servicing/${item.id}`
            );
          },
        },
      ]}
    />
  );
}
