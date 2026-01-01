import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { API_CONFIG } from "@/services/apiConfig";
import apiService from "@/services/apiService";
import {
    NotificationState,
    Notification,
    NotificationFilter,
    NotificationFilters,
    GetNotificationsResponse,
    UnreadCountResponse,
} from "@/types/notification/notificationTypes";

// ---------------- Initial State ----------------

const initialState: NotificationState = {
    notifications: [],
    unreadCount: 0,
    unreadByType: {},
    filter: "all",
    loading: "idle",
    markingAsRead: false,
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

export const getNotifications = createAsyncThunk<
    GetNotificationsResponse,
    NotificationFilters,
    { rejectValue: string }
>("notification/getNotifications", async (filters, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_NOTIFICATIONS, {
            params: filters,
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch notifications"
        );
    }
});

export const getNotificationById = createAsyncThunk<
    Notification,
    string,
    { rejectValue: string }
>("notification/getNotificationById", async (notificationId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_NOTIFICATION_BY_ID.replace(':id', notificationId);
        const response = await apiService.get(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch notification"
        );
    }
});

export const markAsRead = createAsyncThunk<
    Notification,
    string,
    { rejectValue: string }
>("notification/markAsRead", async (notificationId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.MARK_AS_READ.replace(':id', notificationId);
        const response = await apiService.post(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to mark as read"
        );
    }
});

export const markAllAsRead = createAsyncThunk<
    { success: boolean },
    void,
    { rejectValue: string }
>("notification/markAllAsRead", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.post(API_CONFIG.ENDPOINTS.MARK_ALL_AS_READ);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to mark all as read"
        );
    }
});

export const deleteNotification = createAsyncThunk<
    { id: string },
    string,
    { rejectValue: string }
>("notification/deleteNotification", async (notificationId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.DELETE_NOTIFICATION.replace(':id', notificationId);
        await apiService.delete(endpoint);
        return { id: notificationId };
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to delete notification"
        );
    }
});

export const deleteAllNotifications = createAsyncThunk<
    { success: boolean },
    void,
    { rejectValue: string }
>("notification/deleteAllNotifications", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(API_CONFIG.ENDPOINTS.DELETE_ALL_NOTIFICATIONS);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to delete all notifications"
        );
    }
});

export const getUnreadCount = createAsyncThunk<
    UnreadCountResponse,
    void,
    { rejectValue: string }
>("notification/getUnreadCount", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_UNREAD_COUNT);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch unread count"
        );
    }
});

// ---------------- Slice ----------------

const notificationSlice = createSlice({
    name: "notification",
    initialState,

    reducers: {
        setFilter: (state, action: PayloadAction<NotificationFilter>) => {
            state.filter = action.payload;
        },

        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.unshift(action.payload);
            if (!action.payload.isRead) {
                state.unreadCount += 1;
                const type = action.payload.type;
                state.unreadByType[type] = (state.unreadByType[type] || 0) + 1;
            }
        },

        updateNotification: (state, action: PayloadAction<{ id: string; updates: Partial<Notification> }>) => {
            const index = state.notifications.findIndex(n => n.id === action.payload.id);
            if (index !== -1) {
                state.notifications[index] = { ...state.notifications[index], ...action.payload.updates };
            }
        },

        removeNotification: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification && !notification.isRead) {
                state.unreadCount = Math.max(0, state.unreadCount - 1);
                const type = notification.type;
                if (state.unreadByType[type]) {
                    state.unreadByType[type] = Math.max(0, state.unreadByType[type]! - 1);
                }
            }
            state.notifications = state.notifications.filter(n => n.id !== action.payload);
        },

        clearNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
            state.unreadByType = {};
            state.pagination = initialState.pagination;
        },

        clearError: (state) => {
            state.error = null;
        },

        resetNotificationState: () => initialState,
    },

    extraReducers: (builder) => {
        // Get Notifications
        builder
            .addCase(getNotifications.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.notifications = action.payload.notifications;
                state.pagination = action.payload.pagination;
                state.unreadCount = action.payload.unreadCount;
                state.lastFetched = Date.now();
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch notifications";
            });

        // Get Notification by ID
        builder
            .addCase(getNotificationById.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getNotificationById.fulfilled, (state) => {
                state.loading = "succeeded";
            })
            .addCase(getNotificationById.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch notification";
            });

        // Mark as Read
        builder
            .addCase(markAsRead.pending, (state) => {
                state.markingAsRead = true;
                state.error = null;
            })
            .addCase(markAsRead.fulfilled, (state, action) => {
                state.markingAsRead = false;
                const index = state.notifications.findIndex(n => n.id === action.payload.id);
                if (index !== -1) {
                    const wasUnread = !state.notifications[index].isRead;
                    state.notifications[index] = action.payload;
                    if (wasUnread) {
                        state.unreadCount = Math.max(0, state.unreadCount - 1);
                        const type = action.payload.type;
                        if (state.unreadByType[type]) {
                            state.unreadByType[type] = Math.max(0, state.unreadByType[type]! - 1);
                        }
                    }
                }
            })
            .addCase(markAsRead.rejected, (state, action) => {
                state.markingAsRead = false;
                state.error = action.payload ?? "Failed to mark as read";
            });

        // Mark All as Read
        builder
            .addCase(markAllAsRead.pending, (state) => {
                state.markingAsRead = true;
                state.error = null;
            })
            .addCase(markAllAsRead.fulfilled, (state) => {
                state.markingAsRead = false;
                state.notifications = state.notifications.map(n => ({ ...n, isRead: true }));
                state.unreadCount = 0;
                state.unreadByType = {};
            })
            .addCase(markAllAsRead.rejected, (state, action) => {
                state.markingAsRead = false;
                state.error = action.payload ?? "Failed to mark all as read";
            });

        // Delete Notification
        builder
            .addCase(deleteNotification.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.loading = "succeeded";
                const notification = state.notifications.find(n => n.id === action.payload.id);
                if (notification && !notification.isRead) {
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                    const type = notification.type;
                    if (state.unreadByType[type]) {
                        state.unreadByType[type] = Math.max(0, state.unreadByType[type]! - 1);
                    }
                }
                state.notifications = state.notifications.filter(n => n.id !== action.payload.id);
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to delete notification";
            });

        // Delete All Notifications
        builder
            .addCase(deleteAllNotifications.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(deleteAllNotifications.fulfilled, (state) => {
                state.loading = "succeeded";
                state.notifications = [];
                state.unreadCount = 0;
                state.unreadByType = {};
                state.pagination = initialState.pagination;
            })
            .addCase(deleteAllNotifications.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to delete all notifications";
            });

        // Get Unread Count
        builder
            .addCase(getUnreadCount.pending, (state) => {
                state.error = null;
            })
            .addCase(getUnreadCount.fulfilled, (state, action) => {
                state.unreadCount = action.payload.unreadCount;
                state.unreadByType = action.payload.byType;
            })
            .addCase(getUnreadCount.rejected, (state, action) => {
                state.error = action.payload ?? "Failed to fetch unread count";
            });
    },
});

export const {
    setFilter,
    addNotification,
    updateNotification,
    removeNotification,
    clearNotifications,
    clearError,
    resetNotificationState,
} = notificationSlice.actions;

export default notificationSlice.reducer;
