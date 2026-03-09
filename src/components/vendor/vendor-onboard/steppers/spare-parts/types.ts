// Types for Spare Parts Stepper components

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface InventoryItem {
  partName: string;
  category: string;
  brand: string;
  partNumber: string;
  price: number;
  stockQuantity: number;
}

export interface PartFormData {
  partName: string;
  category: string;
  brand: string;
  partNumber: string;
  price: string;
  stockQuantity: string;
}
