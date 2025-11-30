"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AddOnService } from '@/types/select-service';
import { Service } from '@/data/services';

interface SelectServiceState {
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
  availableAddOns: AddOnService[];
  loading: boolean;
  error: string | null;
}

interface SelectServiceContextType extends SelectServiceState {
  updateField: (field: keyof SelectServiceState, value: any) => void;
  toggleAddOn: (addOnId: string) => void;
  toggleService: (service: Service) => void;
  setAvailableAddOns: (addOns: AddOnService[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
  calculateTotals: () => {
    addOnsTotal: number;
    servicesTotal: number;
    totalAmount: number;
    selectedAddOns: AddOnService[];
  };
  validateForm: () => boolean;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const SelectServiceContext = createContext<SelectServiceContextType | undefined>(undefined);

type SelectServiceAction =
  | { type: 'UPDATE_FIELD'; field: keyof SelectServiceState; value: any }
  | { type: 'TOGGLE_ADD_ON'; addOnId: string }
  | { type: 'TOGGLE_SERVICE'; service: Service }
  | { type: 'SET_AVAILABLE_ADD_ONS'; addOns: AddOnService[] }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'RESET_FORM' }
  | { type: 'LOAD_DATA'; data: Partial<SelectServiceState> };

const initialState: SelectServiceState = {
  mode: 'walkin',
  date: '',
  time: '',
  fullName: '',
  phone: '',
  email: '',
  addOns: [],
  notes: '',
  guest: false,
  selectedServices: [],
  availableAddOns: [],
  loading: false,
  error: null,
};

function selectServiceReducer(state: SelectServiceState, action: SelectServiceAction): SelectServiceState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    
    case 'TOGGLE_ADD_ON':
      return {
        ...state,
        addOns: state.addOns.includes(action.addOnId)
          ? state.addOns.filter(id => id !== action.addOnId)
          : [...state.addOns, action.addOnId],
      };
    
    case 'TOGGLE_SERVICE':
      return {
        ...state,
        selectedServices: state.selectedServices.find(s => s.id === action.service.id)
          ? state.selectedServices.filter(s => s.id !== action.service.id)
          : [...state.selectedServices, action.service],
      };
    
    case 'SET_AVAILABLE_ADD_ONS':
      return {
        ...state,
        availableAddOns: action.addOns,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };
    
    case 'RESET_FORM':
      return {
        ...initialState,
        availableAddOns: state.availableAddOns, // Keep available add-ons
      };
    
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.data,
      };
    
    default:
      return state;
  }
}

interface SelectServiceProviderProps {
  children: ReactNode;
  initialData?: Partial<SelectServiceState>;
  availableAddOns?: AddOnService[];
}

export function SelectServiceProvider({ children, initialData = {}, availableAddOns = [] }: SelectServiceProviderProps) {
  const [state, dispatch] = useReducer(selectServiceReducer, {
    ...initialState,
    ...initialData,
    availableAddOns,
  });

  const updateField = (field: keyof SelectServiceState, value: any) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  const toggleAddOn = (addOnId: string) => {
    dispatch({ type: 'TOGGLE_ADD_ON', addOnId });
  };

  const toggleService = (service: Service) => {
    dispatch({ type: 'TOGGLE_SERVICE', service });
  };

  const setAvailableAddOns = (addOns: AddOnService[]) => {
    dispatch({ type: 'SET_AVAILABLE_ADD_ONS', addOns });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', error });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const calculateTotals = () => {
    const selectedAddOns = state.availableAddOns.filter(addon => state.addOns.includes(addon.id));
    const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    const servicesTotal = state.selectedServices.reduce((sum, service) => sum + (service.price || 0), 0);
    const totalAmount = addOnsTotal + servicesTotal;

    return {
      addOnsTotal,
      servicesTotal,
      totalAmount,
      selectedAddOns,
    };
  };

  const validateForm = () => {
    const requiredFields = ['mode', 'date', 'time', 'fullName', 'phone', 'email'];
    const missingFields = requiredFields.filter(field => !state[field as keyof SelectServiceState]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(state.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }

    setError(null);
    return true;
  };

  const saveToLocalStorage = () => {
    try {
      const dataToSave = {
        mode: state.mode,
        date: state.date,
        time: state.time,
        fullName: state.fullName,
        phone: state.phone,
        email: state.email,
        addOns: state.addOns,
        notes: state.notes,
        guest: state.guest,
        selectedServices: state.selectedServices,
      };
      localStorage.setItem('selectServiceData', JSON.stringify(dataToSave));
    } catch (err) {
      console.warn('Failed to save to localStorage:', err);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem('selectServiceData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', data: parsed });
      }
    } catch (err) {
      console.warn('Failed to load from localStorage:', err);
    }
  };

  // Auto-save to localStorage when relevant data changes
  React.useEffect(() => {
    saveToLocalStorage();
  }, [state.mode, state.date, state.time, state.fullName, state.phone, state.email, state.addOns, state.notes, state.guest, state.selectedServices]);

  const value: SelectServiceContextType = {
    ...state,
    updateField,
    toggleAddOn,
    toggleService,
    setAvailableAddOns,
    setLoading,
    setError,
    resetForm,
    calculateTotals,
    validateForm,
    saveToLocalStorage,
    loadFromLocalStorage,
  };

  return (
    <SelectServiceContext.Provider value={value}>
      {children}
    </SelectServiceContext.Provider>
  );
}

export function useSelectService() {
  const context = useContext(SelectServiceContext);
  if (context === undefined) {
    throw new Error('useSelectService must be used within a SelectServiceProvider');
  }
  return context;
}
