import { useState, useEffect } from 'react';
import { AddOnService } from '@/types/select-service';
import { Service } from '@/data/services';

interface SelectServiceData {
  mode: string;
  date: string;
  time: string;
  fullName: string;
  phone: string;
  email: string;
  addOns: string[];
  notes: string;
  guest: boolean;
  selectedServices: Service[];
}

interface UseSelectServiceDataProps {
  initialData?: Partial<SelectServiceData>;
  availableAddOns?: AddOnService[];
  onSave?: (data: SelectServiceData) => void;
}

export function useSelectServiceData({ 
  initialData = {}, 
  availableAddOns = [],
  onSave 
}: UseSelectServiceDataProps) {
  const [data, setData] = useState<SelectServiceData>({
    mode: initialData.mode || 'walkin',
    date: initialData.date || '',
    time: initialData.time || '',
    fullName: initialData.fullName || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
    addOns: initialData.addOns || [],
    notes: initialData.notes || '',
    guest: initialData.guest || false,
    selectedServices: initialData.selectedServices || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default add-ons if not provided
  const defaultAddOns: AddOnService[] = [
    { id: "ac", name: "Air Conditioning", price: 25, icon: "/icons/ac.svg" },
    { id: "roadworthy", name: "Roadworthy Inspection", price: 25, icon: "/icons/road.svg" },
    { id: "glass", name: "Auto Glass", price: 25, icon: "/icons/glass.svg" },
    { id: "spark", name: "Spark Plug", price: 25, icon: "/icons/spark.svg" },
    { id: "battery", name: "Battery", price: 25, icon: "/icons/battery.svg" },
    { id: "suspension", name: "Suspension and Steering", price: 25, icon: "/icons/suspension.svg" },
  ];

  const addOns = availableAddOns.length > 0 ? availableAddOns : defaultAddOns;

  // Update specific field
  const updateField = (field: keyof SelectServiceData, value: any) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Toggle add-on service
  const toggleAddOn = (addOnId: string) => {
    setData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(id => id !== addOnId)
        : [...prev.addOns, addOnId]
    }));
  };

  // Add/remove selected service
  const toggleService = (service: Service) => {
    setData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.find(s => s.id === service.id)
        ? prev.selectedServices.filter(s => s.id !== service.id)
        : [...prev.selectedServices, service]
    }));
  };

  // Calculate totals
  const calculateTotals = () => {
    const selectedAddOnServices = addOns.filter(addon => data.addOns.includes(addon.id));
    const addOnsTotal = selectedAddOnServices.reduce((sum, addon) => sum + addon.price, 0);
    const servicesTotal = data.selectedServices.reduce((sum, service) => sum + (service.price || 0), 0);
    const totalAmount = addOnsTotal + servicesTotal;

    return {
      addOnsTotal,
      servicesTotal,
      totalAmount,
      selectedAddOns: selectedAddOnServices
    };
  };

  // Validate form
  const validateForm = () => {
    const requiredFields = ['mode', 'date', 'time', 'fullName', 'phone', 'email'];
    const missingFields = requiredFields.filter(field => !data[field as keyof SelectServiceData]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }

    setError(null);
    return true;
  };

  // Save data
  const saveData = async () => {
    if (!validateForm()) {
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const totals = calculateTotals();
      const saveData = {
        ...data,
        ...totals,
        timestamp: new Date().toISOString(),
      };

      if (onSave) {
        await onSave(saveData);
      }

      // Save to localStorage for persistence
      localStorage.setItem('selectServiceData', JSON.stringify(saveData));

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save data');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('selectServiceData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setData(prev => ({
          ...prev,
          ...parsed
        }));
      }
    } catch (err) {
      console.warn('Failed to load saved data:', err);
    }
  }, []);

  // Auto-save to localStorage when data changes
  useEffect(() => {
    try {
      localStorage.setItem('selectServiceData', JSON.stringify(data));
    } catch (err) {
      console.warn('Failed to auto-save data:', err);
    }
  }, [data]);

  return {
    data,
    addOns,
    loading,
    error,
    updateField,
    toggleAddOn,
    toggleService,
    calculateTotals,
    saveData,
    validateForm,
    setError,
  };
}
