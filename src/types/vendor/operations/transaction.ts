// Transaction Center related types

export interface Transaction {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  vehicleId?: string;
  vehicleInfo?: string;
  bookingId?: string;
  amount: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionDate: string; // ISO string
  dueDate?: string; // ISO string
  paidDate?: string; // ISO string
  description: string;
  items: TransactionItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
  type: "service" | "part" | "labor" | "other";
}

export type PaymentMethod =
  | "cash"
  | "card"
  | "bank_transfer"
  | "upi"
  | "wallet"
  | "cheque"
  | "other";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "partially_paid"
  | "overdue"
  | "cancelled"
  | "refunded";

export interface TransactionFilters {
  search?: string;
  status?: PaymentStatus[];
  paymentMethod?: PaymentMethod[];
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  customerId?: string;
}

export interface TransactionSummary {
  totalTransactions: number;
  totalRevenue: number;
  totalPaid: number;
  totalPending: number;
  totalOverdue: number;
  averageTransactionValue: number;
}

export interface PaymentBreakdown {
  method: PaymentMethod;
  count: number;
  total: number;
  percentage: number;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface TransactionExport {
  format: "csv" | "excel" | "pdf";
  filters?: TransactionFilters;
  dateRange?: {
    from: string;
    to: string;
  };
}

// For creating new transactions
export interface CreateTransactionData {
  customerId: string;
  vehicleId?: string;
  bookingId?: string;
  amount: number;
  tax: number;
  paymentMethod: PaymentMethod;
  description: string;
  items: Omit<TransactionItem, "id">[];
  dueDate?: string;
  notes?: string;
}

// For updating transactions
export interface UpdateTransactionData {
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paidDate?: string;
  notes?: string;
}
