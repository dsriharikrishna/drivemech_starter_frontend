// src/constants/workshop.constants.ts

/**
 * Workshop Constants
 * Global constants for workshop-related data
 */

// Workshop service tags
export const WORKSHOP_TAGS = [
  { id: "car-wash", name: "Car Wash", icon: "🚿" },
  { id: "ac-service", name: "AC Service", icon: "❄️" },
  { id: "puncture", name: "Puncture", icon: "🔧" },
  { id: "battery", name: "Battery", icon: "🔋" },
  { id: "tyre", name: "Tyre", icon: "🛞" },
  { id: "suspension", name: "Suspension", icon: "🔩" },
  { id: "brake", name: "Brake", icon: "🛑" },
  { id: "engine", name: "Engine", icon: "⚙️" },
  { id: "oil-change", name: "Oil Change", icon: "🛢️" },
  { id: "detailing", name: "Detailing", icon: "✨" },
] as const;

// Workshop highlights/features
export const WORKSHOP_HIGHLIGHTS = [
  { id: "diagnostic", name: "Full diagnostic check", icon: "🔍" },
  { id: "ac-cooling", name: "AC & Cooling system check", icon: "❄️" },
  { id: "brake-inspection", name: "Brake performance inspection", icon: "🛑" },
  { id: "engine-tune", name: "Engine tuning", icon: "⚙️" },
  { id: "wheel-alignment", name: "Wheel alignment", icon: "🛞" },
  { id: "oil-filter", name: "Oil & filter change", icon: "🛢️" },
  { id: "battery-check", name: "Battery health check", icon: "🔋" },
  { id: "suspension-check", name: "Suspension check", icon: "🔩" },
] as const;

// Workshop certifications
export const WORKSHOP_CERTIFICATIONS = [
  { id: "iso-9001", name: "ISO 9001 Certified", icon: "🏆" },
  { id: "authorized", name: "Authorized Service Center", icon: "✅" },
  { id: "certified-mechanics", name: "Certified Mechanics", icon: "👨‍🔧" },
  { id: "warranty", name: "Warranty Provided", icon: "🛡️" },
  { id: "insurance", name: "Insurance Accepted", icon: "📄" },
] as const;

// Workshop amenities
export const WORKSHOP_AMENITIES = [
  { id: "wifi", name: "Free WiFi", icon: "📶" },
  { id: "waiting-area", name: "Comfortable Waiting Area", icon: "🪑" },
  { id: "refreshments", name: "Refreshments", icon: "☕" },
  { id: "parking", name: "Parking Available", icon: "🅿️" },
  { id: "pickup-drop", name: "Pickup & Drop Service", icon: "🚗" },
  { id: "loaner-car", name: "Loaner Car Available", icon: "🚙" },
] as const;

// Workshop status
export const WORKSHOP_STATUS = [
  { id: "open", name: "Open", color: "green" },
  { id: "closed", name: "Closed", color: "red" },
  { id: "busy", name: "Busy", color: "orange" },
  { id: "available", name: "Available", color: "blue" },
] as const;

// Rating categories
export const RATING_CATEGORIES = [
  { id: "service-quality", name: "Service Quality" },
  { id: "pricing", name: "Pricing" },
  { id: "timeliness", name: "Timeliness" },
  { id: "staff-behavior", name: "Staff Behavior" },
  { id: "cleanliness", name: "Cleanliness" },
] as const;

// Distance ranges (for filtering)
export const DISTANCE_RANGES = [
  { id: "0-5", name: "Within 5 km", min: 0, max: 5 },
  { id: "5-10", name: "5 - 10 km", min: 5, max: 10 },
  { id: "10-20", name: "10 - 20 km", min: 10, max: 20 },
  { id: "20+", name: "Above 20 km", min: 20, max: 1000 },
] as const;

// Sort options for workshops
export const WORKSHOP_SORT_OPTIONS = [
  { id: "distance", name: "Distance", icon: "📍" },
  { id: "rating", name: "Rating", icon: "⭐" },
  { id: "price", name: "Price", icon: "💰" },
  { id: "reviews", name: "Reviews", icon: "💬" },
] as const;

// Type exports
export type WorkshopTag = (typeof WORKSHOP_TAGS)[number];
export type WorkshopHighlight = (typeof WORKSHOP_HIGHLIGHTS)[number];
export type WorkshopCertification = (typeof WORKSHOP_CERTIFICATIONS)[number];
export type WorkshopAmenity = (typeof WORKSHOP_AMENITIES)[number];
export type WorkshopStatus = (typeof WORKSHOP_STATUS)[number]["id"];
export type RatingCategory = (typeof RATING_CATEGORIES)[number];
export type WorkshopSortOption = (typeof WORKSHOP_SORT_OPTIONS)[number]["id"];
