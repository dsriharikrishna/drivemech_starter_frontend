import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { API_CONFIG } from "@/services/apiConfig";
import apiService from "@/services/apiService";
import {
    OrderState,
    Order,
    OrderType,
    OrderStatus,
    OrderFilters,
    GetOrdersPayload,
    UpdateOrderStatusPayload,
    CancelOrderPayload,
    RequestReturnPayload,
    FileClaimPayload,
    AddNomineePayload,
    ModifyPolicyPayload,
    GetOrdersResponse,
    ServiceOrder,
    SparesOrder,
    InsuranceOrder,
    TowingOrder,
} from "@/types/order/orderTypes";

// ---------------- Initial State ----------------

const initialState: OrderState = {
    orders: [],
    activeOrders: [],
    completedOrders: [],
    selectedOrder: null,
    filterType: "all",
    filterStatus: "all",
    filters: {},
    loading: "idle",
    orderLoading: "idle",
    actionLoading: "idle",
    pagination: {
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        limit: 10,
    },
    summary: null,
    error: null,
    lastFetched: null,
};

// ---------------- Thunks ----------------

export const getOrders = createAsyncThunk<
    GetOrdersResponse,
    GetOrdersPayload,
    { rejectValue: string }
>("order/getOrders", async (payload, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_ORDERS, {
            params: payload,
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch orders"
        );
    }
});

export const getOrderById = createAsyncThunk<
    Order | ServiceOrder | SparesOrder | InsuranceOrder | TowingOrder,
    string,
    { rejectValue: string }
>("order/getOrderById", async (orderId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_ORDER_BY_ID.replace(':id', orderId);
        const response = await apiService.get(endpoint);
        const data = response.data.data || response.data;
        return data.order || data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch order"
        );
    }
});

export const getServiceOrders = createAsyncThunk<
    Order[],
    void,
    { rejectValue: string }
>("order/getServiceOrders", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_SERVICE_ORDERS);
        const data = response.data.data || response.data;
        return data.orders || data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch service orders"
        );
    }
});

export const getSparesOrders = createAsyncThunk<
    Order[],
    void,
    { rejectValue: string }
>("order/getSparesOrders", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_SPARES_ORDERS);
        const data = response.data.data || response.data;
        return data.orders || data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch spares orders"
        );
    }
});

export const getInsuranceOrders = createAsyncThunk<
    Order[],
    void,
    { rejectValue: string }
>("order/getInsuranceOrders", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_INSURANCE_ORDERS);
        const data = response.data.data || response.data;
        return data.orders || data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch insurance orders"
        );
    }
});

export const getTowingOrders = createAsyncThunk<
    Order[],
    void,
    { rejectValue: string }
>("order/getTowingOrders", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_TOWING_ORDERS);
        const data = response.data.data || response.data;
        return data.orders || data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch towing orders"
        );
    }
});

export const updateOrderStatus = createAsyncThunk<
    Order,
    UpdateOrderStatusPayload,
    { rejectValue: string }
>("order/updateOrderStatus", async (payload, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.UPDATE_ORDER_STATUS.replace(':id', payload.orderId);
        const response = await apiService.put(endpoint, {
            status: payload.status,
            notes: payload.notes,
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to update order status"
        );
    }
});

export const cancelOrder = createAsyncThunk<
    Order,
    CancelOrderPayload,
    { rejectValue: string }
>("order/cancelOrder", async (payload, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.CANCEL_ORDER.replace(':id', payload.orderId);
        const response = await apiService.post(endpoint, {
            reason: payload.reason,
            refundMethod: payload.refundMethod,
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to cancel order"
        );
    }
});

export const reorderService = createAsyncThunk<
    Order,
    string,
    { rejectValue: string }
>("order/reorderService", async (orderId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.REORDER_SERVICE.replace(':id', orderId);
        const response = await apiService.post(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to reorder service"
        );
    }
});

export const downloadInvoice = createAsyncThunk<
    { invoiceUrl: string },
    string,
    { rejectValue: string }
>("order/downloadInvoice", async (orderId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.DOWNLOAD_INVOICE.replace(':id', orderId);
        const response = await apiService.get(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to download invoice"
        );
    }
});

export const requestReturn = createAsyncThunk<
    SparesOrder,
    RequestReturnPayload,
    { rejectValue: string }
>("order/requestReturn", async (payload, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.REQUEST_RETURN.replace(':id', payload.orderId);
        const response = await apiService.post(endpoint, {
            items: payload.items,
            refundMethod: payload.refundMethod,
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to request return"
        );
    }
});

export const trackReturn = createAsyncThunk<
    { returnStatus: string; trackingInfo: any },
    string,
    { rejectValue: string }
>("order/trackReturn", async (orderId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.TRACK_RETURN.replace(':id', orderId);
        const response = await apiService.get(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to track return"
        );
    }
});

export const fileClaim = createAsyncThunk<
    InsuranceOrder,
    FileClaimPayload,
    { rejectValue: string }
>("order/fileClaim", async (payload, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.FILE_CLAIM.replace(':id', payload.orderId);
        const formData = new FormData();
        formData.append('claimAmount', payload.claimAmount.toString());
        formData.append('reason', payload.reason);
        formData.append('description', payload.description);
        payload.documents.forEach((doc, index) => {
            formData.append(`documents[${index}]`, doc);
        });

        const response = await apiService.post(endpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to file claim"
        );
    }
});

export const addNominee = createAsyncThunk<
    InsuranceOrder,
    AddNomineePayload,
    { rejectValue: string }
>("order/addNominee", async (payload, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.ADD_NOMINEE.replace(':id', payload.orderId);
        const response = await apiService.post(endpoint, { nominee: payload.nominee });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to add nominee"
        );
    }
});

export const modifyPolicy = createAsyncThunk<
    InsuranceOrder,
    ModifyPolicyPayload,
    { rejectValue: string }
>("order/modifyPolicy", async (payload, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.MODIFY_POLICY.replace(':id', payload.orderId);
        const response = await apiService.post(endpoint, { modifications: payload.modifications });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to modify policy"
        );
    }
});

// ---------------- Slice ----------------

const orderSlice = createSlice({
    name: "order",
    initialState,

    reducers: {
        setFilterType: (state, action: PayloadAction<OrderType | 'all'>) => {
            state.filterType = action.payload;
        },

        setFilterStatus: (state, action: PayloadAction<OrderStatus | 'all'>) => {
            state.filterStatus = action.payload;
        },

        setFilters: (state, action: PayloadAction<OrderFilters>) => {
            state.filters = action.payload;
        },

        updateFilters: (state, action: PayloadAction<Partial<OrderFilters>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },

        setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
            state.selectedOrder = action.payload;
        },

        clearOrders: (state) => {
            state.orders = [];
            state.activeOrders = [];
            state.completedOrders = [];
            state.pagination = initialState.pagination;
        },

        clearError: (state) => {
            state.error = null;
        },

        resetOrderState: () => initialState,
    },

    extraReducers: (builder) => {
        // Get Orders
        builder
            .addCase(getOrders.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders = action.payload.orders;
                state.pagination = action.payload.pagination;
                state.summary = action.payload.summary || null;
                state.lastFetched = Date.now();
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch orders";
            });

        // Get Order by ID
        builder
            .addCase(getOrderById.pending, (state) => {
                state.orderLoading = "pending";
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.orderLoading = "succeeded";
                state.selectedOrder = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.orderLoading = "failed";
                state.error = action.payload ?? "Failed to fetch order";
            });

        // Get Service Orders
        builder
            .addCase(getServiceOrders.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getServiceOrders.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders = action.payload;
            })
            .addCase(getServiceOrders.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch service orders";
            });

        // Get Spares Orders
        builder
            .addCase(getSparesOrders.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getSparesOrders.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders = action.payload;
            })
            .addCase(getSparesOrders.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch spares orders";
            });

        // Get Insurance Orders
        builder
            .addCase(getInsuranceOrders.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getInsuranceOrders.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders = action.payload;
            })
            .addCase(getInsuranceOrders.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch insurance orders";
            });

        // Get Towing Orders
        builder
            .addCase(getTowingOrders.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getTowingOrders.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders = action.payload;
            })
            .addCase(getTowingOrders.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch towing orders";
            });

        // Update Order Status
        builder
            .addCase(updateOrderStatus.pending, (state) => {
                state.actionLoading = "pending";
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.actionLoading = "succeeded";
                state.selectedOrder = action.payload;
                const index = state.orders.findIndex(o => o.id === action.payload.id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.actionLoading = "failed";
                state.error = action.payload ?? "Failed to update order status";
            });

        // Cancel Order
        builder
            .addCase(cancelOrder.pending, (state) => {
                state.actionLoading = "pending";
                state.error = null;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.actionLoading = "succeeded";
                state.selectedOrder = action.payload;
                const index = state.orders.findIndex(o => o.id === action.payload.id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.actionLoading = "failed";
                state.error = action.payload ?? "Failed to cancel order";
            });

        // Reorder Service
        builder
            .addCase(reorderService.pending, (state) => {
                state.actionLoading = "pending";
                state.error = null;
            })
            .addCase(reorderService.fulfilled, (state, action) => {
                state.actionLoading = "succeeded";
                state.orders.unshift(action.payload);
            })
            .addCase(reorderService.rejected, (state, action) => {
                state.actionLoading = "failed";
                state.error = action.payload ?? "Failed to reorder service";
            });

        // Download Invoice
        builder
            .addCase(downloadInvoice.pending, (state) => {
                state.actionLoading = "pending";
                state.error = null;
            })
            .addCase(downloadInvoice.fulfilled, (state) => {
                state.actionLoading = "succeeded";
            })
            .addCase(downloadInvoice.rejected, (state, action) => {
                state.actionLoading = "failed";
                state.error = action.payload ?? "Failed to download invoice";
            });

        // Request Return
        builder
            .addCase(requestReturn.pending, (state) => {
                state.actionLoading = "pending";
                state.error = null;
            })
            .addCase(requestReturn.fulfilled, (state, action) => {
                state.actionLoading = "succeeded";
                state.selectedOrder = action.payload;
            })
            .addCase(requestReturn.rejected, (state, action) => {
                state.actionLoading = "failed";
                state.error = action.payload ?? "Failed to request return";
            });

        // Track Return
        builder
            .addCase(trackReturn.pending, (state) => {
                state.actionLoading = "pending";
                state.error = null;
            })
            .addCase(trackReturn.fulfilled, (state) => {
                state.actionLoading = "succeeded";
            })
            .addCase(trackReturn.rejected, (state, action) => {
                state.actionLoading = "failed";
                state.error = action.payload ?? "Failed to track return";
            });

        // File Claim
        builder
            .addCase(fileClaim.pending, (state) => {
                state.actionLoading = "pending";
                state.error = null;
            })
            .addCase(fileClaim.fulfilled, (state, action) => {
                state.actionLoading = "succeeded";
                state.selectedOrder = action.payload;
            })
            .addCase(fileClaim.rejected, (state, action) => {
                state.actionLoading = "failed";
                state.error = action.payload ?? "Failed to file claim";
            });

        // Add Nominee
        builder
            .addCase(addNominee.pending, (state) => {
                state.actionLoading = "pending";
                state.error = null;
            })
            .addCase(addNominee.fulfilled, (state, action) => {
                state.actionLoading = "succeeded";
                state.selectedOrder = action.payload;
            })
            .addCase(addNominee.rejected, (state, action) => {
                state.actionLoading = "failed";
                state.error = action.payload ?? "Failed to add nominee";
            });

        // Modify Policy
        builder
            .addCase(modifyPolicy.pending, (state) => {
                state.actionLoading = "pending";
                state.error = null;
            })
            .addCase(modifyPolicy.fulfilled, (state, action) => {
                state.actionLoading = "succeeded";
                state.selectedOrder = action.payload;
            })
            .addCase(modifyPolicy.rejected, (state, action) => {
                state.actionLoading = "failed";
                state.error = action.payload ?? "Failed to modify policy";
            });
    },
});

export const {
    setFilterType,
    setFilterStatus,
    setFilters,
    updateFilters,
    setSelectedOrder,
    clearOrders,
    clearError,
    resetOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;
