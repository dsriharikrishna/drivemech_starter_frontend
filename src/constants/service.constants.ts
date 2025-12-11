// src/constants/service.constants.ts

/**
 * Service Constants
 * Global constants for service-related data
 */

// Service categories
export const SERVICE_CATEGORIES = [
    { id: 'maintenance', name: 'Maintenance', icon: '🔧' },
    { id: 'repair', name: 'Repair', icon: '🛠️' },
    { id: 'inspection', name: 'Inspection', icon: '🔍' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧼' },
    { id: 'upgrade', name: 'Upgrade', icon: '⬆️' },
] as const;

// Add-on services
export const ADDON_SERVICES = [
    {
        id: 'ac',
        name: 'Air Conditioning',
        price: 25,
        icon: '/icons/ac.svg',
        description: 'AC inspection and service'
    },
    {
        id: 'roadworthy',
        name: 'Roadworthy Inspection',
        price: 25,
        icon: '/icons/road.svg',
        description: 'Complete vehicle inspection'
    },
    {
        id: 'glass',
        name: 'Auto Glass',
        price: 25,
        icon: '/icons/glass.svg',
        description: 'Windshield and glass service'
    },
    {
        id: 'spark',
        name: 'Spark Plug',
        price: 25,
        icon: '/icons/spark.svg',
        description: 'Spark plug replacement'
    },
    {
        id: 'battery',
        name: 'Battery',
        price: 25,
        icon: '/icons/battery.svg',
        description: 'Battery check and replacement'
    },
    {
        id: 'suspension',
        name: 'Suspension and Steering',
        price: 25,
        icon: '/icons/suspension.svg',
        description: 'Suspension system check'
    },
] as const;

// Service modes
export const SERVICE_MODES = [
    {
        id: 'walkin',
        name: 'Walk-in',
        description: 'Bring your vehicle to the workshop',
        icon: '🚗'
    },
    {
        id: 'pickup',
        name: 'Pickup & Drop',
        description: 'We will pickup and return your vehicle',
        icon: '🚚'
    },
] as const;

// Service priorities
export const SERVICE_PRIORITIES = [
    { id: 'low', name: 'Low', color: 'green' },
    { id: 'medium', name: 'Medium', color: 'yellow' },
    { id: 'high', name: 'High', color: 'orange' },
    { id: 'urgent', name: 'Urgent', color: 'red' },
] as const;

// Service status
export const SERVICE_STATUS = [
    { id: 'pending', name: 'Pending', color: 'gray' },
    { id: 'confirmed', name: 'Confirmed', color: 'blue' },
    { id: 'in-progress', name: 'In Progress', color: 'yellow' },
    { id: 'completed', name: 'Completed', color: 'green' },
    { id: 'cancelled', name: 'Cancelled', color: 'red' },
] as const;

// Time slots for booking
export const TIME_SLOTS = [
    { id: '09:00', name: '9:00 AM - 10:00 AM', value: '09:00' },
    { id: '10:00', name: '10:00 AM - 11:00 AM', value: '10:00' },
    { id: '11:00', name: '11:00 AM - 12:00 PM', value: '11:00' },
    { id: '12:00', name: '12:00 PM - 1:00 PM', value: '12:00' },
    { id: '13:00', name: '1:00 PM - 2:00 PM', value: '13:00' },
    { id: '14:00', name: '2:00 PM - 3:00 PM', value: '14:00' },
    { id: '15:00', name: '3:00 PM - 4:00 PM', value: '15:00' },
    { id: '16:00', name: '4:00 PM - 5:00 PM', value: '16:00' },
    { id: '17:00', name: '5:00 PM - 6:00 PM', value: '17:00' },
] as const;

// Type exports
export type ServiceCategory = typeof SERVICE_CATEGORIES[number]['id'];
export type AddOnService = typeof ADDON_SERVICES[number];
export type ServiceMode = typeof SERVICE_MODES[number]['id'];
export type ServicePriority = typeof SERVICE_PRIORITIES[number]['id'];
export type ServiceStatus = typeof SERVICE_STATUS[number]['id'];
export type TimeSlot = typeof TIME_SLOTS[number];
