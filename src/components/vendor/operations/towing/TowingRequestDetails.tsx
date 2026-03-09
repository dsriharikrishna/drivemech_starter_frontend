"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Car,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import type {
  CustomerInformation,
  VehicleDetails,
  BreakdownDetails,
  BreakdownLocation,
  DriverInfo,
  TimelineEvent,
} from "@/schemas/vendor/towing.schema";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import Button from "@/components/ui/Button";

interface TowingRequest {
  id: string;
  requestId: string;
  priority: "high" | "medium" | "low";
  createdAt: string;
  status: string;
  customerInfo: CustomerInformation;
  vehicleDetails: VehicleDetails;
  breakdownDetails: BreakdownDetails;
  breakdownLocation: BreakdownLocation;
}

interface TowingRequestDetailsProps {
  request: TowingRequest;
  onBack: () => void;
}

const TowingRequestDetails: React.FC<TowingRequestDetailsProps> = ({
  request,
  onBack,
}) => {
  const [assignedDriver, setAssignedDriver] = useState<DriverInfo | null>(null);
  const [showDriverTracking, setShowDriverTracking] = useState(false);

  const {
    requestId,
    priority,
    createdAt,
    customerInfo,
    vehicleDetails,
    breakdownDetails,
    breakdownLocation,
  } = request;

  const availableDrivers: DriverInfo[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      vehicle: "Tow Truck - KA-05-TT-1001",
      vehicleReg: "KA-05-TT-1001",
      rating: 4.8,
      completed: 234,
      distance: "2.3 km",
      eta: "8 mins",
      status: "available",
      phone: "+91 99887 76655",
    },
    {
      id: "2",
      name: "Suresh Patil",
      vehicle: "Tow Truck - KA-05-TT-1002",
      vehicleReg: "KA-05-TT-1002",
      rating: 4.8,
      completed: 312,
      distance: "4.1 km",
      eta: "12 mins",
      status: "available",
    },
    {
      id: "3",
      name: "Ramesh Rao",
      vehicle: "Tow Truck - KA-05-TT-1003",
      vehicleReg: "KA-05-TT-1003",
      rating: 4.8,
      completed: 189,
      distance: "6.8 km",
      eta: "18 mins",
      status: "available",
    },
    {
      id: "4",
      name: "Ganesh Kumar",
      vehicle: "Flatbed Truck - KA-05-FT-2001",
      vehicleReg: "KA-05-FT-2001",
      rating: 4.8,
      completed: 156,
      distance: "3.5 km",
      eta: "10 mins",
      status: "busy",
    },
  ];

  const timeline: TimelineEvent[] = [
    {
      id: "1",
      title: "Request Created",
      timestamp: createdAt,
      status: "completed",
    },
    {
      id: "2",
      title: "Driver Assigned",
      timestamp: "",
      status: assignedDriver ? "completed" : "pending",
    },
    { id: "3", title: "Driver En Route", timestamp: "", status: "pending" },
    { id: "4", title: "Vehicle Picked Up", timestamp: "", status: "pending" },
    {
      id: "5",
      title: "Delivered to Workshop",
      timestamp: "",
      status: "pending",
    },
    { id: "6", title: "Request Completed", timestamp: "", status: "pending" },
  ];

  const handleAssignDriver = (driver: DriverInfo) => {
    setAssignedDriver(driver);
  };

  const handleTrackDriver = () => {
    setShowDriverTracking(true);
  };

  const getPriorityBadge = () => {
    const config = {
      high: "bg-red-500 text-white",
      medium: "bg-yellow-500 text-white",
      low: "bg-gray-500 text-white",
    };
    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded ${config[priority]}`}
      >
        {priority.toUpperCase()} PRIORITY
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gray-800 text-white px-4 py-3 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-base font-semibold">
                Towing Request: {requestId}
              </h2>
              <p className="text-xs text-gray-300">
                Created on 2024, 11-27 at 09:30 AM
              </p>
            </div>
          </div>
          {getPriorityBadge()}
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <User size={18} className="text-gray-700" />
          <h3 className="text-sm font-semibold text-gray-900">
            Customer Information
          </h3>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <label className="text-xs text-gray-600">Name</label>
            <p className="text-sm font-medium text-gray-900">
              {customerInfo.name}
            </p>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600 flex items-center gap-1">
              <Phone size={12} /> Phone
            </label>
            <p className="text-sm font-medium text-gray-900">
              {customerInfo.phone}
            </p>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600 flex items-center gap-1">
              <Mail size={12} /> Email
            </label>
            <p className="text-sm font-medium text-gray-900">
              {customerInfo.email}
            </p>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600 flex items-center gap-1">
              <MapPin size={12} /> Address
            </label>
            <p className="text-sm font-medium text-gray-900">
              {customerInfo.address}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Left Column - Customer, Vehicle, Breakdown Info */}
        <div className="flex-[2] space-y-4">
          {/* Vehicle Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Car size={18} className="text-gray-700" />
              <h3 className="text-sm font-semibold text-gray-900">
                Vehicle Details
              </h3>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <label className="text-xs text-gray-600">Make & Model</label>
                <p className="text-sm font-medium text-gray-900">
                  {vehicleDetails.makeModel}
                </p>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600">Year</label>
                <p className="text-sm font-medium text-gray-900">
                  {vehicleDetails.year}
                </p>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600">Registration</label>
                <p className="text-sm font-medium text-gray-900">
                  {vehicleDetails.registration}
                </p>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600">Color</label>
                <p className="text-sm font-medium text-gray-900">
                  {vehicleDetails.color}
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown Details */}
          <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={18} className="text-orange-600" />
              <h3 className="text-sm font-semibold text-gray-900">
                Breakdown Details
              </h3>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-600">Issue Type</label>
                <p className="text-sm font-medium text-gray-900">
                  {breakdownDetails.issueType}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-600">Description</label>
                <p className="text-sm text-gray-900">
                  {breakdownDetails.description}
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown Location */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-gray-700" />
              <h3 className="text-sm font-semibold text-gray-900">
                Breakdown Location
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-600">Location</label>
                  <p className="text-sm font-medium text-gray-900">
                    {breakdownLocation.location}
                  </p>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-600">Landmark</label>
                  <p className="text-sm font-medium text-gray-900">
                    {breakdownLocation.landmark}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-orange-600">
                <MapPin size={14} />
                <span>
                  Distance from workshop:{" "}
                  {breakdownLocation.distanceFromWorkshop}
                </span>
              </div>
            </div>
            {/* Map Placeholder */}
            <div className="mt-3 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-sm text-gray-500">Map View</p>
            </div>
          </div>
        </div>

        {/* Right Column - Driver Assignment & Timeline */}
        <div className="flex-1 space-y-4">
          {/* Assigned Driver or Driver List */}
          {assignedDriver ? (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Assigned Driver
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-base">
                    {assignedDriver.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {assignedDriver.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {assignedDriver.vehicle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone size={12} />
                  <span>{assignedDriver.phone}</span>
                </div>
                <div className="bg-blue-50 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-0.5">
                    ETA to Breakdown
                  </p>
                  <p className="text-base font-semibold text-orange-600">
                    {assignedDriver.eta}
                  </p>
                </div>
                <button
                  onClick={handleTrackDriver}
                  className="w-full px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                >
                  Track Driver
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Assign Driver
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className={`border rounded-lg p-2 ${driver.status === "busy"
                        ? "border-gray-200 bg-gray-50"
                        : "border-gray-200"
                      }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {driver.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-900">
                          {driver.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {driver.vehicle}
                        </p>
                        {driver.status === "available" && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded">
                            Available
                          </span>
                        )}
                        {driver.status === "busy" && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded">
                            Busy
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs mb-1.5">
                      <span className="text-gray-600">⭐ {driver.rating}</span>
                      <span className="text-gray-600">
                        Completed: {driver.completed}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs mb-2">
                      <span className="text-gray-600">
                        Distance: {driver.distance}
                      </span>
                      <span className="text-orange-600">ETA: {driver.eta}</span>
                    </div>
                    <button
                      onClick={() => handleAssignDriver(driver)}
                      disabled={driver.status === "busy"}
                      className={`w-full px-2 py-1.5 text-xs font-medium rounded ${driver.status === "busy"
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                        }`}
                    >
                      Assign to Request
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Request Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={18} className="text-gray-700" />
              <h3 className="text-sm font-semibold text-gray-900">
                Request Timeline
              </h3>
            </div>
            <div className="flex flex-col gap-0">
              {timeline.map((event, index) => (
                <div key={event.id} className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${event.status === "completed"
                          ? "bg-green-100"
                          : event.status === "active"
                            ? "bg-orange-100"
                            : "bg-gray-100"
                        }`}
                    >
                      {event.status === "completed" && (
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {event.status === "active" && (
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      )}
                      {event.status === "pending" && (
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-10 bg-gray-200"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <p
                      className={`text-xs font-medium ${event.status === "completed" ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {event.title}
                    </p>
                    {event.timestamp && (
                      <p className="text-xs text-gray-500">{event.timestamp}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Driver Tracking Modal */}
      <Dialog
        isOpen={showDriverTracking && !!assignedDriver}
        onClose={() => setShowDriverTracking(false)}
      >
        <DialogBody className="w-2xl h-auto p-2">
          {assignedDriver && (
            <>
              <div className="bg-orange-500 text-white px-6 py-4 flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-orange-500 font-semibold text-lg">
                    {assignedDriver.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Driver Tracking</h3>
                    <p className="text-sm">{assignedDriver.name}</p>
                    <p className="text-sm">{assignedDriver.vehicle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDriverTracking(false)}
                  className="cursor-pointer text-white hover:bg-orange-600 p-2 rounded transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <p className="text-lg font-semibold text-gray-900">
                    En Route to Breakdown
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-orange-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-0.5">ETA</p>
                    <p className="text-xl font-bold text-orange-600">
                      {assignedDriver.eta}
                    </p>
                  </div>
                  <div className="flex-1 bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-0.5">Distance</p>
                    <p className="text-xl font-bold text-blue-600">
                      {assignedDriver.distance}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Current Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-600" />
                    <p className="text-gray-900">Indiranagar</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button startIcon={<Phone size={16} />} className="flex-1">
                    Call Driver
                  </Button>
                  <Button
                    variant="outline"
                    startIcon={<Mail size={16} />}
                    className="flex-1"
                  >
                    Message
                  </Button>
                </div>
                <p className="text-xs text-center text-gray-500">
                  Last updated: Just now • Real-time tracking
                </p>
              </div>
            </>
          )}
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default TowingRequestDetails;
