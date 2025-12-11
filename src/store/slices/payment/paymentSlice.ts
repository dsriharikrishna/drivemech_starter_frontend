import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { API_CONFIG } from "@/services/apiConfig";
import apiService from "@/services/apiService";
import {
    PaymentState,
    PaymentMethod,
    Payment,
    Transaction,
    TransactionFilters,
    AddPaymentMethodPayload,
    ProcessPaymentPayload,
    VerifyPaymentPayload,
    RefundPaymentPayload,
    AddMoneyToWalletPayload,
    GetPaymentMethodsResponse,
    ProcessPaymentResponse,
    GetTransactionsResponse,
    WalletBalanceResponse,
    SavedCard,
    UPIAccount,
} from "@/types/payment/paymentTypes";

// ---------------- Initial State ----------------

const initialState: PaymentState = {
    savedCards: [],
    savedUPI: [],
    paymentMethods: [],
    defaultPaymentMethod: null,
    walletBalance: 0,
    walletCurrency: "INR",
    currentPayment: null,
    transactions: [],
    transactionFilters: {},
    loading: "idle",
    paymentLoading: "idle",
    walletLoading: "idle",
    pagination: {
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        limit: 10,
    },
    error: null,
    lastFetched: null,
};

// ---------------- Thunks ----------------

export const getPaymentMethods = createAsyncThunk<
    GetPaymentMethodsResponse,
    void,
    { rejectValue: string }
>("payment/getPaymentMethods", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_PAYMENT_METHODS);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch payment methods"
        );
    }
});

export const addPaymentMethod = createAsyncThunk<
    PaymentMethod,
    AddPaymentMethodPayload,
    { rejectValue: string }
>("payment/addPaymentMethod", async (payload, { rejectWithValue }) => {
    try {
        const response = await apiService.post(API_CONFIG.ENDPOINTS.ADD_PAYMENT_METHOD, payload);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to add payment method"
        );
    }
});

export const removePaymentMethod = createAsyncThunk<
    { id: string },
    string,
    { rejectValue: string }
>("payment/removePaymentMethod", async (methodId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.REMOVE_PAYMENT_METHOD.replace(':id', methodId);
        await apiService.delete(endpoint);
        return { id: methodId };
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to remove payment method"
        );
    }
});

export const setDefaultPaymentMethod = createAsyncThunk<
    PaymentMethod,
    string,
    { rejectValue: string }
>("payment/setDefaultPaymentMethod", async (methodId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.SET_DEFAULT_PAYMENT_METHOD.replace(':id', methodId);
        const response = await apiService.post(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to set default payment method"
        );
    }
});

export const processPayment = createAsyncThunk<
    ProcessPaymentResponse,
    ProcessPaymentPayload,
    { rejectValue: string }
>("payment/processPayment", async (payload, { rejectWithValue }) => {
    try {
        const response = await apiService.post(API_CONFIG.ENDPOINTS.PROCESS_PAYMENT, payload);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Payment processing failed"
        );
    }
});

export const verifyPayment = createAsyncThunk<
    Payment,
    VerifyPaymentPayload,
    { rejectValue: string }
>("payment/verifyPayment", async (payload, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.VERIFY_PAYMENT.replace(':id', payload.paymentId);
        const response = await apiService.post(endpoint, {
            gatewayTransactionId: payload.gatewayTransactionId,
            signature: payload.signature,
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Payment verification failed"
        );
    }
});

export const refundPayment = createAsyncThunk<
    Payment,
    RefundPaymentPayload,
    { rejectValue: string }
>("payment/refundPayment", async (payload, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.REFUND_PAYMENT.replace(':id', payload.paymentId);
        const response = await apiService.post(endpoint, {
            amount: payload.amount,
            reason: payload.reason,
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Refund processing failed"
        );
    }
});

export const getTransactions = createAsyncThunk<
    GetTransactionsResponse,
    TransactionFilters,
    { rejectValue: string }
>("payment/getTransactions", async (filters, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_TRANSACTIONS, {
            params: filters,
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch transactions"
        );
    }
});

export const getTransactionById = createAsyncThunk<
    Transaction,
    string,
    { rejectValue: string }
>("payment/getTransactionById", async (transactionId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_TRANSACTION_BY_ID.replace(':id', transactionId);
        const response = await apiService.get(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch transaction"
        );
    }
});

export const downloadReceipt = createAsyncThunk<
    { receiptUrl: string },
    string,
    { rejectValue: string }
>("payment/downloadReceipt", async (transactionId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.DOWNLOAD_RECEIPT.replace(':id', transactionId);
        const response = await apiService.get(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to download receipt"
        );
    }
});

export const getWalletBalance = createAsyncThunk<
    WalletBalanceResponse,
    void,
    { rejectValue: string }
>("payment/getWalletBalance", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_WALLET_BALANCE);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch wallet balance"
        );
    }
});

export const addMoneyToWallet = createAsyncThunk<
    WalletBalanceResponse,
    AddMoneyToWalletPayload,
    { rejectValue: string }
>("payment/addMoneyToWallet", async (payload, { rejectWithValue }) => {
    try {
        const response = await apiService.post(API_CONFIG.ENDPOINTS.ADD_MONEY_TO_WALLET, payload);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to add money to wallet"
        );
    }
});

export const getWalletTransactions = createAsyncThunk<
    Transaction[],
    void,
    { rejectValue: string }
>("payment/getWalletTransactions", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_WALLET_TRANSACTIONS);
        const data = response.data.data || response.data;
        return data.transactions || data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch wallet transactions"
        );
    }
});

// ---------------- Slice ----------------

const paymentSlice = createSlice({
    name: "payment",
    initialState,

    reducers: {
        setCurrentPayment: (state, action: PayloadAction<Payment | null>) => {
            state.currentPayment = action.payload;
        },

        setDefaultPaymentMethodLocal: (state, action: PayloadAction<PaymentMethod | null>) => {
            state.defaultPaymentMethod = action.payload;
        },

        setTransactionFilters: (state, action: PayloadAction<TransactionFilters>) => {
            state.transactionFilters = action.payload;
        },

        updateTransactionFilters: (state, action: PayloadAction<Partial<TransactionFilters>>) => {
            state.transactionFilters = { ...state.transactionFilters, ...action.payload };
        },

        clearPaymentMethods: (state) => {
            state.paymentMethods = [];
            state.savedCards = [];
            state.savedUPI = [];
            state.defaultPaymentMethod = null;
        },

        clearTransactions: (state) => {
            state.transactions = [];
            state.pagination = initialState.pagination;
        },

        clearError: (state) => {
            state.error = null;
        },

        resetPaymentState: () => initialState,
    },

    extraReducers: (builder) => {
        // Get Payment Methods
        builder
            .addCase(getPaymentMethods.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getPaymentMethods.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.paymentMethods = action.payload.paymentMethods;
                state.savedCards = action.payload.paymentMethods.filter(
                    (m): m is PaymentMethod & { details: SavedCard } => m.type === 'card'
                ).map(m => m.details);
                state.savedUPI = action.payload.paymentMethods.filter(
                    (m): m is PaymentMethod & { details: UPIAccount } => m.type === 'upi'
                ).map(m => m.details);
                state.defaultPaymentMethod = action.payload.paymentMethods.find(m => m.isDefault) || null;
                state.lastFetched = Date.now();
            })
            .addCase(getPaymentMethods.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch payment methods";
            });

        // Add Payment Method
        builder
            .addCase(addPaymentMethod.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(addPaymentMethod.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.paymentMethods.push(action.payload);
                if (action.payload.isDefault) {
                    state.defaultPaymentMethod = action.payload;
                }
            })
            .addCase(addPaymentMethod.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to add payment method";
            });

        // Remove Payment Method
        builder
            .addCase(removePaymentMethod.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(removePaymentMethod.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.paymentMethods = state.paymentMethods.filter(m => m.id !== action.payload.id);
                if (state.defaultPaymentMethod?.id === action.payload.id) {
                    state.defaultPaymentMethod = null;
                }
            })
            .addCase(removePaymentMethod.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to remove payment method";
            });

        // Set Default Payment Method
        builder
            .addCase(setDefaultPaymentMethod.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(setDefaultPaymentMethod.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.defaultPaymentMethod = action.payload;
                state.paymentMethods = state.paymentMethods.map(m => ({
                    ...m,
                    isDefault: m.id === action.payload.id,
                }));
            })
            .addCase(setDefaultPaymentMethod.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to set default payment method";
            });

        // Process Payment
        builder
            .addCase(processPayment.pending, (state) => {
                state.paymentLoading = "pending";
                state.error = null;
            })
            .addCase(processPayment.fulfilled, (state, action) => {
                state.paymentLoading = "succeeded";
                state.currentPayment = action.payload.payment;
            })
            .addCase(processPayment.rejected, (state, action) => {
                state.paymentLoading = "failed";
                state.error = action.payload ?? "Payment processing failed";
            });

        // Verify Payment
        builder
            .addCase(verifyPayment.pending, (state) => {
                state.paymentLoading = "pending";
                state.error = null;
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.paymentLoading = "succeeded";
                state.currentPayment = action.payload;
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.paymentLoading = "failed";
                state.error = action.payload ?? "Payment verification failed";
            });

        // Refund Payment
        builder
            .addCase(refundPayment.pending, (state) => {
                state.paymentLoading = "pending";
                state.error = null;
            })
            .addCase(refundPayment.fulfilled, (state, action) => {
                state.paymentLoading = "succeeded";
                state.currentPayment = action.payload;
            })
            .addCase(refundPayment.rejected, (state, action) => {
                state.paymentLoading = "failed";
                state.error = action.payload ?? "Refund processing failed";
            });

        // Get Transactions
        builder
            .addCase(getTransactions.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.transactions = action.payload.transactions;
                state.pagination = action.payload.pagination;
                state.lastFetched = Date.now();
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch transactions";
            });

        // Get Transaction by ID
        builder
            .addCase(getTransactionById.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getTransactionById.fulfilled, (state) => {
                state.loading = "succeeded";
            })
            .addCase(getTransactionById.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch transaction";
            });

        // Download Receipt
        builder
            .addCase(downloadReceipt.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(downloadReceipt.fulfilled, (state) => {
                state.loading = "succeeded";
            })
            .addCase(downloadReceipt.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to download receipt";
            });

        // Get Wallet Balance
        builder
            .addCase(getWalletBalance.pending, (state) => {
                state.walletLoading = "pending";
                state.error = null;
            })
            .addCase(getWalletBalance.fulfilled, (state, action) => {
                state.walletLoading = "succeeded";
                state.walletBalance = action.payload.balance;
                state.walletCurrency = action.payload.currency;
            })
            .addCase(getWalletBalance.rejected, (state, action) => {
                state.walletLoading = "failed";
                state.error = action.payload ?? "Failed to fetch wallet balance";
            });

        // Add Money to Wallet
        builder
            .addCase(addMoneyToWallet.pending, (state) => {
                state.walletLoading = "pending";
                state.error = null;
            })
            .addCase(addMoneyToWallet.fulfilled, (state, action) => {
                state.walletLoading = "succeeded";
                state.walletBalance = action.payload.balance;
            })
            .addCase(addMoneyToWallet.rejected, (state, action) => {
                state.walletLoading = "failed";
                state.error = action.payload ?? "Failed to add money to wallet";
            });

        // Get Wallet Transactions
        builder
            .addCase(getWalletTransactions.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getWalletTransactions.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.transactions = action.payload;
            })
            .addCase(getWalletTransactions.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch wallet transactions";
            });
    },
});

export const {
    setCurrentPayment,
    setDefaultPaymentMethodLocal,
    setTransactionFilters,
    updateTransactionFilters,
    clearPaymentMethods,
    clearTransactions,
    clearError,
    resetPaymentState,
} = paymentSlice.actions;

export default paymentSlice.reducer;
