"use client";

import React from 'react';
import SelectServiceLayout from '@/app/(drivemech)/customer/select-service/SelectServiceLayout';
import { SelectServiceProvider } from '@/contexts/SelectServiceContext';
import { AddOnService } from '@/types/select-service';
import { Service } from '@/data/services';

// Example dynamic data
const dynamicAddOns: AddOnService[] = [
  { id: "ac", name: "Air Conditioning", price: 25, icon: "/icons/ac.svg" },
  { id: "roadworthy", name: "Roadworthy Inspection", price: 25, icon: "/icons/road.svg" },
  { id: "glass", name: "Auto Glass", price: 25, icon: "/icons/glass.svg" },
  { id: "spark", name: "Spark Plug", price: 25, icon: "/icons/spark.svg" },
  { id: "battery", name: "Battery", price: 25, icon: "/icons/battery.svg" },
  { id: "suspension", name: "Suspension and Steering", price: 25, icon: "/icons/suspension.svg" },
];

const selectedServices: Service[] = [
  {
    id: "1",
    name: "Full Service",
    icon: "🔧",
    description: "Complete vehicle maintenance",
    hasNested: false,
  },
  {
    id: "2", 
    name: "Oil Change",
    icon: "🛢️",
    description: "Engine oil replacement",
    hasNested: false,
  },
];

export default function DynamicSelectServiceExample() {
  const handleFormSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
    
    // Here you can:
    // 1. Send data to API
    // 2. Navigate to next page
    // 3. Save to database
    // 4. Show confirmation
    
    // Example API call
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      console.log('Booking created:', result);
      // Navigate to success page
    })
    .catch(error => {
      console.error('Error creating booking:', error);
    });
  };

  const handleBack = () => {
    // Navigate back to previous page
    window.history.back();
  };

  // Example of loading data from API
  const loadInitialData = async () => {
    try {
      // Load saved booking data
      const response = await fetch('/api/bookings/draft');
      const savedData = await response.json();
      return savedData;
    } catch (error) {
      console.error('Error loading initial data:', error);
      return {};
    }
  };

  // Example of loading dynamic add-ons from API
  const loadDynamicAddOns = async (): Promise<AddOnService[]> => {
    try {
      const response = await fetch('/api/add-ons');
      return await response.json();
    } catch (error) {
      console.error('Error loading add-ons:', error);
      return dynamicAddOns;
    }
  };

  return (
    <SelectServiceProvider>
      <SelectServiceLayout
        initialData={{
          mode: "walkin",
          date: "2025-07-30",
          time: "2:00 PM",
          fullName: "John Doe",
          phone: "+1234567890",
          email: "john.doe@example.com",
          guest: false,
        }}
        availableAddOns={dynamicAddOns}
        selectedServices={selectedServices}
        onFormSubmit={handleFormSubmit}
        onBack={handleBack}
      />
    </SelectServiceProvider>
  );
}

// Example of how to use with different configurations
export function CustomSelectServiceExample() {
  const customAddOns: AddOnService[] = [
    { id: "premium", name: "Premium Service", price: 100, icon: "/icons/premium.svg" },
    { id: "express", name: "Express Service", price: 50, icon: "/icons/express.svg" },
  ];

  const customServices: Service[] = [
    {
      id: "custom1",
      name: "Custom Package",
      icon: "⭐",
      description: "Tailored service package",
      hasNested: false,
    },
  ];

  return (
    <SelectServiceProvider>
      <SelectServiceLayout
        initialData={{
          mode: "pickup",
          guest: true,
        }}
        availableAddOns={customAddOns}
        selectedServices={customServices}
        onFormSubmit={(data) => {
          console.log('Custom form submission:', data);
        }}
      />
    </SelectServiceProvider>
  );
}

// Example of how to integrate with Redux or other state management
export function ReduxIntegratedExample() {
  // This would typically come from your Redux store
  const reduxState = {
    selectedServices: [],
    userData: {
      name: '',
      email: '',
      phone: '',
    },
    preferences: {
      mode: 'walkin',
      guest: false,
    },
  };

  return (
    <SelectServiceProvider>
      <SelectServiceLayout
        initialData={{
          mode: reduxState.preferences.mode,
          fullName: reduxState.userData.name,
          email: reduxState.userData.email,
          phone: reduxState.userData.phone,
          guest: reduxState.preferences.guest,
        }}
        selectedServices={reduxState.selectedServices}
        onFormSubmit={(data) => {
          // Dispatch to Redux
          // store.dispatch(createBooking(data));
          console.log('Redux integrated submission:', data);
        }}
      />
    </SelectServiceProvider>
  );
}
