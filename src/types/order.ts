export interface Order {
  orderId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  date: string;
  serviceType: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
  serviceCenter: {
    name: string;
    address: string;
    phone: string;
  };
  services: Array<{
    name: string;
    price: number;
  }>;
  total: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentMethod: string;
  notes?: string;
  assignedMechanic?: {
    name: string;
    rating: number;
  };
  estimatedCompletion?: string;
  completedAt?: string;
}
