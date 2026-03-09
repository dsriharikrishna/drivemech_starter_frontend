/**
 * Booking Utilities
 * Helper functions for booking-related operations
 */

import { AddOnService } from "@/types/customer/services/select-service";

/**
 * Format a date string for display
 * @param dateStr - Date string in YYYY-MM-DD format
 * @param fallback - Fallback text when date is empty
 * @returns Formatted date string (e.g., "February 11, 2026")
 */
export const formatBookingDate = (
    dateStr: string,
    fallback: string = "Not selected"
): string => {
    if (!dateStr) return fallback;

    const date = new Date(dateStr);

    // Check if date is valid
    if (isNaN(date.getTime())) return fallback;

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

/**
 * Format a time string from 24-hour to 12-hour format
 * @param timeStr - Time string in HH:MM format (24-hour)
 * @param fallback - Fallback text when time is empty
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export const formatBookingTime = (
    timeStr: string,
    fallback: string = "Not selected"
): string => {
    if (!timeStr) return fallback;

    // Validate time format
    if (!timeStr.match(/^\d{1,2}:\d{2}$/)) return fallback;

    const [hours, minutes] = timeStr.split(":").map(Number);

    // Validate hours and minutes
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return fallback;

    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;

    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

/**
 * Calculate total price of selected add-on services
 * @param addOns - Array of all available add-on services
 * @param selectedAddOnIds - Array of selected add-on IDs
 * @returns Total price of selected add-ons
 */
export const calculateAddOnsTotal = (
    addOns: AddOnService[],
    selectedAddOnIds: string[]
): number => {
    if (!selectedAddOnIds || selectedAddOnIds.length === 0) return 0;

    const selectedAddOns = addOns.filter((addon) =>
        selectedAddOnIds.includes(addon.id)
    );

    return selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
};

/**
 * Format service mode for display
 * @param mode - Service mode ("pickup" or "walkin")
 * @returns Formatted mode string
 */
export const formatServiceMode = (
    mode: "pickup" | "walkin"
): string => {
    return mode === "pickup" ? "Pickup & Drop" : "Walk-in";
};

/**
 * Format currency amount
 * @param amount - Amount to format
 * @param currency - Currency symbol (default: "$")
 * @returns Formatted currency string (e.g., "$25")
 */
export const formatCurrency = (
    amount: number,
    currency: string = "$"
): string => {
    return `${currency}${amount.toFixed(2)}`;
};

/**
 * Validate if a date is in the future or today
 * @param dateStr - Date string to validate
 * @returns True if date is valid and not in the past
 */
export const isValidBookingDate = (dateStr: string): boolean => {
    if (!dateStr) return false;

    const selectedDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate >= today;
};

/**
 * Get selected add-on services from IDs
 * @param addOns - Array of all available add-on services
 * @param selectedAddOnIds - Array of selected add-on IDs
 * @returns Array of selected add-on service objects
 */
export const getSelectedAddOns = (
    addOns: AddOnService[],
    selectedAddOnIds: string[]
): AddOnService[] => {
    if (!selectedAddOnIds || selectedAddOnIds.length === 0) return [];

    return addOns.filter((addon) => selectedAddOnIds.includes(addon.id));
};

/**
 * Format address for display
 * @param address - Address string
 * @param maxLength - Maximum length before truncation
 * @param fallback - Fallback text when address is empty
 * @returns Formatted address string
 */
export const formatAddress = (
    address: string | undefined,
    maxLength: number = 50,
    fallback: string = "Not entered yet"
): string => {
    if (!address) return fallback;

    if (address.length > maxLength) {
        return `${address.substring(0, maxLength)}...`;
    }

    return address;
};

/**
 * Generate booking timestamp in ISO format
 * @returns ISO timestamp string
 */
export const generateBookingTimestamp = (): string => {
    return new Date().toISOString();
};

/**
 * Format service count for display
 * @param count - Number of services
 * @returns Formatted service count string (e.g., "3 service(s)")
 */
export const formatServiceCount = (count: number): string => {
    if (count === 0) return "None";
    return `${count} service${count !== 1 ? "s" : ""}`;
};
