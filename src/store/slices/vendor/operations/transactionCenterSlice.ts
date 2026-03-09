import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Transaction,
  TransactionFilters,
  TransactionSummary,
  PaymentBreakdown,
  PaginationState,
  CreateTransactionData,
  UpdateTransactionData,
  PaymentStatus,
} from "@/types/vendor/operations/transaction";

// ============ Async Thunks ============
// NOTE: API endpoints are not yet developed - these are commented out for now

// Fetch all transactions
export const fetchTransactions = createAsyncThunk(
  "transactionCenter/fetchTransactions",
  async (
    { vendorId, filters }: { vendorId: string; filters?: TransactionFilters },
    { rejectWithValue }
  ) => {
    try {
      // TODO: Uncomment when API is ready
      // const queryParams = new URLSearchParams(filters as any).toString();
      // const response = await fetch(`/api/vendors/${vendorId}/transactions?${queryParams}`);
      // if (!response.ok) throw new Error('Failed to fetch transactions');
      // return await response.json();

      // For now, return empty array
      return [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Create a new transaction
export const createTransaction = createAsyncThunk(
  "transactionCenter/createTransaction",
  async (data: CreateTransactionData, { rejectWithValue }) => {
    try {
      // TODO: Uncomment when API is ready
      // const response = await fetch('/api/transactions', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to create transaction');
      // return await response.json();

      // For now, return mock transaction
      return {
        ...data,
        id: Date.now().toString(),
        invoiceNumber: `INV-${Date.now()}`,
        customerName: "Customer Name",
        total: data.amount + data.tax,
        paymentStatus: "pending" as PaymentStatus,
        transactionDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: data.items.map((item, index) => ({
          ...item,
          id: `item-${index}`,
        })),
      } as Transaction;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Update transaction
export const updateTransaction = createAsyncThunk(
  "transactionCenter/updateTransaction",
  async (
    {
      transactionId,
      data,
    }: { transactionId: string; data: UpdateTransactionData },
    { rejectWithValue }
  ) => {
    try {
      // TODO: Uncomment when API is ready
      // const response = await fetch(`/api/transactions/${transactionId}`, {
      //     method: 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to update transaction');
      // return await response.json();

      // For now, return the data
      return { transactionId, ...data };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Fetch transaction summary
export const fetchTransactionSummary = createAsyncThunk(
  "transactionCenter/fetchSummary",
  async (vendorId: string, { rejectWithValue }) => {
    try {
      // TODO: Uncomment when API is ready
      // const response = await fetch(`/api/vendors/${vendorId}/transactions/summary`);
      // if (!response.ok) throw new Error('Failed to fetch summary');
      // return await response.json();

      // For now, return mock summary
      return {
        totalTransactions: 0,
        totalRevenue: 0,
        totalPaid: 0,
        totalPending: 0,
        totalOverdue: 0,
        averageTransactionValue: 0,
      } as TransactionSummary;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// ============ State Interface ============

interface TransactionCenterState {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  filters: TransactionFilters;
  summary: TransactionSummary | null;
  paymentBreakdown: PaymentBreakdown[];
  pagination: PaginationState;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionCenterState = {
  transactions: [],
  selectedTransaction: null,
  filters: {},
  summary: null,
  paymentBreakdown: [],
  pagination: {
    page: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

// ============ Slice ============

const transactionCenterSlice = createSlice({
  name: "transactionCenter",
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set selected transaction
    setSelectedTransaction: (
      state,
      action: PayloadAction<Transaction | null>
    ) => {
      state.selectedTransaction = action.payload;
    },

    // Update filters
    setFilters: (state, action: PayloadAction<TransactionFilters>) => {
      state.filters = action.payload;
    },

    // Clear filters
    clearFilters: (state) => {
      state.filters = {};
    },

    // Set pagination
    setPagination: (state, action: PayloadAction<Partial<PaginationState>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },

    // Add transaction locally
    addTransactionLocally: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
      state.pagination.totalItems += 1;
    },

    // Update transaction locally
    updateTransactionLocally: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },

    // Remove transaction locally
    removeTransactionLocally: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
      state.pagination.totalItems -= 1;
    },

    // Clear all transactions
    clearTransactions: (state) => {
      state.transactions = [];
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------- Fetch Transactions --------
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch transactions";
      })

      // -------- Create Transaction --------
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.unshift(action.payload);
        state.pagination.totalItems += 1;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to create transaction";
      })

      // -------- Update Transaction --------
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.transactionId
        );
        if (index !== -1) {
          state.transactions[index] = {
            ...state.transactions[index],
            ...action.payload,
            updatedAt: new Date().toISOString(),
          };
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to update transaction";
      })

      // -------- Fetch Summary --------
      .addCase(fetchTransactionSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchTransactionSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch summary";
      });
  },
});

// ============ Exports ============

export const {
  clearError,
  setSelectedTransaction,
  setFilters,
  clearFilters,
  setPagination,
  addTransactionLocally,
  updateTransactionLocally,
  removeTransactionLocally,
  clearTransactions,
} = transactionCenterSlice.actions;

export default transactionCenterSlice.reducer;
