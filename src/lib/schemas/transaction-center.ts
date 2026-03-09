import { z } from "zod";

export const ServiceRequestSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  customerName: z.string(),
  phoneNumber: z.string(),
  vehicleMake: z.string(),
  vehicleModel: z.string(),
  vehicleRegNo: z.string(),
  serviceType: z.string(),
  status: z.enum([
    "Pending",
    "In Progress",
    "Under Servicing",
    "Completed",
    "Cancelled",
    "Ready for Delivery",
    "Gate Pass Issued",
  ]),
  date: z.date().or(z.string()),
  timeSlot: z.string().optional(),

  // Additional details for cards
  year: z.string().optional(),
  fuelType: z.string().optional(),
  supervisor: z.string().optional(),
  technician: z.string().optional(),
  kmReading: z.string().optional(),
  fuelLevel: z.string().optional(),
  image: z.string().optional(),

  // For details page
  email: z.string().email().optional(),
  modeOfService: z.enum(["Pick-Up", "Walk-In"]).optional(),
  scheduledTime: z.string().optional(),
  address: z.string().optional(),
});

export type ServiceRequest = z.infer<typeof ServiceRequestSchema>;
