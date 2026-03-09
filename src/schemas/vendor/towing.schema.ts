import { z } from "zod";

// Towing Request Schema
export const towingRequestSchema = z.object({
  id: z.string(),
  requestId: z.string(),
  customer: z.string(),
  customerPhone: z.string(),
  vehicle: z.string(),
  vehicleReg: z.string(),
  issue: z.string(),
  location: z.string(),
  distance: z.string(),
  status: z.enum(["new", "assigned", "enroute", "pickedup", "completed"]),
  priority: z.enum(["high", "medium", "low"]),
  driver: z.string().optional(),
  eta: z.string().optional(),
  createdAt: z.string(),
});

export type TowingRequest = z.infer<typeof towingRequestSchema>;

// Customer Information
export interface CustomerInformation {
  name: string;
  phone: string;
  email: string;
  address: string;
}

// Vehicle Details
export interface VehicleDetails {
  makeModel: string;
  year: string;
  registration: string;
  color: string;
}

// Breakdown Details
export interface BreakdownDetails {
  issueType: string;
  description: string;
}

// Breakdown Location
export interface BreakdownLocation {
  location: string;
  landmark: string;
  distanceFromWorkshop: string;
}

// Driver Information
export interface DriverInfo {
  id: string;
  name: string;
  vehicle: string;
  vehicleReg: string;
  rating: number;
  completed: number;
  distance: string;
  eta: string;
  status: "available" | "busy";
  phone?: string;
}

// Request Timeline Event
export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  status: "completed" | "active" | "pending";
}

// Driver Tracking
export interface DriverTracking {
  driver: DriverInfo;
  status: string;
  eta: string;
  distance: string;
  currentLocation: string;
}
