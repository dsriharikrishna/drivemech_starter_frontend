// src/constants/booking.constants.ts

/**
 * Booking Constants
 * Global constants for booking-related data
 */

// Booking status
export const BOOKING_STATUS = [
    {
        id: 'draft',
        name: 'Draft',
        color: 'gray',
        icon: '📝',
        description: 'Booking in progress'
    },
    {
        id: 'confirmed',
        name: 'Confirmed',
        color: 'blue',
        icon: '✅',
        description: 'Booking confirmed'
    },
    {
        id: 'in-progress',
        name: 'In Progress',
        color: 'yellow',
        icon: '🔧',
        description: 'Service in progress'
    },
    {
        id: 'completed',
        name: 'Completed',
        color: 'green',
        icon: '✔️',
        description: 'Service completed'
    },
    {
        id: 'cancelled',
        name: 'Cancelled',
        color: 'red',
        icon: '❌',
        description: 'Booking cancelled'
    },
    {
        id: 'rescheduled',
        name: 'Rescheduled',
        color: 'orange',
        icon: '🔄',
        description: 'Booking rescheduled'
    },
] as const;

// Cancellation reasons
export const CANCELLATION_REASONS = [
    { id: 'changed-mind', name: 'Changed my mind' },
    { id: 'found-cheaper', name: 'Found cheaper alternative' },
    { id: 'schedule-conflict', name: 'Schedule conflict' },
    { id: 'vehicle-sold', name: 'Vehicle sold' },
    { id: 'workshop-issue', name: 'Issue with workshop' },
    { id: 'other', name: 'Other reason' },
] as const;

// Reschedule reasons
export const RESCHEDULE_REASONS = [
    { id: 'personal', name: 'Personal emergency' },
    { id: 'work', name: 'Work commitment' },
    { id: 'weather', name: 'Weather conditions' },
    { id: 'vehicle-unavailable', name: 'Vehicle unavailable' },
    { id: 'other', name: 'Other reason' },
] as const;

// Booking types
export const BOOKING_TYPES = [
    { id: 'service', name: 'Service Booking', icon: '🔧' },
    { id: 'inspection', name: 'Inspection', icon: '🔍' },
    { id: 'repair', name: 'Repair', icon: '🛠️' },
    { id: 'maintenance', name: 'Maintenance', icon: '⚙️' },
] as const;

// Priority levels
export const PRIORITY_LEVELS = [
    { id: 'low', name: 'Low', color: 'green', days: 7 },
    { id: 'medium', name: 'Medium', color: 'yellow', days: 3 },
    { id: 'high', name: 'High', color: 'orange', days: 1 },
    { id: 'urgent', name: 'Urgent', color: 'red', days: 0 },
] as const;

// Booking sources
export const BOOKING_SOURCES = [
    { id: 'web', name: 'Website', icon: '🌐' },
    { id: 'mobile', name: 'Mobile App', icon: '📱' },
    { id: 'phone', name: 'Phone Call', icon: '📞' },
    { id: 'walkin', name: 'Walk-in', icon: '🚶' },
] as const;

// Reminder settings
export const REMINDER_SETTINGS = [
    { id: '1-hour', name: '1 hour before', minutes: 60 },
    { id: '2-hours', name: '2 hours before', minutes: 120 },
    { id: '1-day', name: '1 day before', minutes: 1440 },
    { id: '2-days', name: '2 days before', minutes: 2880 },
] as const;

// Booking ID prefix
export const BOOKING_ID_PREFIX = 'DM-' as const;

// Booking confirmation settings
export const BOOKING_CONFIRMATION = {
    autoConfirmMinutes: 30, // Auto-confirm after 30 minutes
    cancellationWindowHours: 24, // Can cancel up to 24 hours before
    rescheduleWindowHours: 12, // Can reschedule up to 12 hours before
} as const;

// Service duration estimates (in minutes)
export const SERVICE_DURATIONS = {
    'oil-change': 30,
    'brake-service': 60,
    'ac-service': 90,
    'full-service': 180,
    'inspection': 45,
    'battery-replacement': 20,
    'tyre-change': 40,
} as const;

// Type exports
export type BookingStatus = typeof BOOKING_STATUS[number]['id'];
export type CancellationReason = typeof CANCELLATION_REASONS[number]['id'];
export type RescheduleReason = typeof RESCHEDULE_REASONS[number]['id'];
export type BookingType = typeof BOOKING_TYPES[number]['id'];
export type PriorityLevel = typeof PRIORITY_LEVELS[number]['id'];
export type BookingSource = typeof BOOKING_SOURCES[number]['id'];
export type ReminderSetting = typeof REMINDER_SETTINGS[number]['id'];
