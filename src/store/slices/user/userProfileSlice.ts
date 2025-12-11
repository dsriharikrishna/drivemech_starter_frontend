import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { API_CONFIG } from "@/services/apiConfig";
import apiService from "@/services/apiService";
import {
    UserProfileState,
    UserInfo,
    Address,
    UserPreferences,
    NotificationSettings,
    UpdateProfilePayload,
    UpdateAvatarPayload,
    AddAddressPayload,
    UpdateAddressPayload,
    UpdatePreferencesPayload,
    UpdateNotificationSettingsPayload,
    GetProfileResponse,
    GetAddressesResponse,
    GetPreferencesResponse,
    GetNotificationSettingsResponse,
} from "@/types/user/userProfileTypes";

// ---------------- Initial State ----------------

const initialState: UserProfileState = {
    profile: null,
    addresses: [],
    defaultAddress: null,
    preferences: null,
    notificationSettings: null,
    profileLoading: "idle",
    addressesLoading: "idle",
    preferencesLoading: "idle",
    error: null,
    lastFetched: null,
};

// ---------------- Thunks ----------------

export const getProfile = createAsyncThunk<
    GetProfileResponse,
    void,
    { rejectValue: string }
>("userProfile/getProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_PROFILE);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch profile"
        );
    }
});

export const updateProfile = createAsyncThunk<
    UserInfo,
    UpdateProfilePayload,
    { rejectValue: string }
>("userProfile/updateProfile", async (payload, { rejectWithValue }) => {
    try {
        const response = await apiService.put(API_CONFIG.ENDPOINTS.UPDATE_PROFILE, payload);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to update profile"
        );
    }
});

export const updateAvatar = createAsyncThunk<
    UserInfo,
    UpdateAvatarPayload,
    { rejectValue: string }
>("userProfile/updateAvatar", async (payload, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        if (payload.avatar instanceof File) {
            formData.append('avatar', payload.avatar);
        } else {
            formData.append('avatar', payload.avatar);
        }

        const response = await apiService.post(API_CONFIG.ENDPOINTS.UPDATE_AVATAR, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to update avatar"
        );
    }
});

export const getAddresses = createAsyncThunk<
    GetAddressesResponse,
    void,
    { rejectValue: string }
>("userProfile/getAddresses", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_ADDRESSES);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch addresses"
        );
    }
});

export const getAddressById = createAsyncThunk<
    Address,
    string,
    { rejectValue: string }
>("userProfile/getAddressById", async (addressId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_ADDRESS_BY_ID.replace(':id', addressId);
        const response = await apiService.get(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch address"
        );
    }
});

export const addAddress = createAsyncThunk<
    Address,
    AddAddressPayload,
    { rejectValue: string }
>("userProfile/addAddress", async (payload, { rejectWithValue }) => {
    try {
        const response = await apiService.post(API_CONFIG.ENDPOINTS.ADD_ADDRESS, payload);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to add address"
        );
    }
});

export const updateAddress = createAsyncThunk<
    Address,
    UpdateAddressPayload,
    { rejectValue: string }
>("userProfile/updateAddress", async (payload, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.UPDATE_ADDRESS.replace(':id', payload.id);
        const response = await apiService.put(endpoint, payload);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to update address"
        );
    }
});

export const deleteAddress = createAsyncThunk<
    { id: string },
    string,
    { rejectValue: string }
>("userProfile/deleteAddress", async (addressId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.DELETE_ADDRESS.replace(':id', addressId);
        await apiService.delete(endpoint);
        return { id: addressId };
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to delete address"
        );
    }
});

export const setDefaultAddress = createAsyncThunk<
    Address,
    string,
    { rejectValue: string }
>("userProfile/setDefaultAddress", async (addressId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.SET_DEFAULT_ADDRESS.replace(':id', addressId);
        const response = await apiService.post(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to set default address"
        );
    }
});

export const getPreferences = createAsyncThunk<
    GetPreferencesResponse,
    void,
    { rejectValue: string }
>("userProfile/getPreferences", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_PREFERENCES);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch preferences"
        );
    }
});

export const updatePreferences = createAsyncThunk<
    UserPreferences,
    UpdatePreferencesPayload,
    { rejectValue: string }
>("userProfile/updatePreferences", async (payload, { rejectWithValue }) => {
    try {
        const response = await apiService.put(API_CONFIG.ENDPOINTS.UPDATE_PREFERENCES, payload);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to update preferences"
        );
    }
});

export const getNotificationSettings = createAsyncThunk<
    GetNotificationSettingsResponse,
    void,
    { rejectValue: string }
>("userProfile/getNotificationSettings", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_NOTIFICATION_SETTINGS);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch notification settings"
        );
    }
});

export const updateNotificationSettings = createAsyncThunk<
    NotificationSettings,
    UpdateNotificationSettingsPayload,
    { rejectValue: string }
>("userProfile/updateNotificationSettings", async (payload, { rejectWithValue }) => {
    try {
        const response = await apiService.put(API_CONFIG.ENDPOINTS.UPDATE_NOTIFICATION_SETTINGS, payload);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to update notification settings"
        );
    }
});

// ---------------- Slice ----------------

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,

    reducers: {
        setProfile: (state, action: PayloadAction<UserInfo | null>) => {
            state.profile = action.payload;
        },

        setDefaultAddressLocal: (state, action: PayloadAction<Address | null>) => {
            state.defaultAddress = action.payload;
        },

        clearAddresses: (state) => {
            state.addresses = [];
            state.defaultAddress = null;
        },

        clearError: (state) => {
            state.error = null;
        },

        resetUserProfileState: () => initialState,
    },

    extraReducers: (builder) => {
        // Get Profile
        builder
            .addCase(getProfile.pending, (state) => {
                state.profileLoading = "pending";
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.profileLoading = "succeeded";
                state.profile = action.payload.profile;
                state.lastFetched = Date.now();
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.profileLoading = "failed";
                state.error = action.payload ?? "Failed to fetch profile";
            });

        // Update Profile
        builder
            .addCase(updateProfile.pending, (state) => {
                state.profileLoading = "pending";
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profileLoading = "succeeded";
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.profileLoading = "failed";
                state.error = action.payload ?? "Failed to update profile";
            });

        // Update Avatar
        builder
            .addCase(updateAvatar.pending, (state) => {
                state.profileLoading = "pending";
                state.error = null;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.profileLoading = "succeeded";
                state.profile = action.payload;
            })
            .addCase(updateAvatar.rejected, (state, action) => {
                state.profileLoading = "failed";
                state.error = action.payload ?? "Failed to update avatar";
            });

        // Get Addresses
        builder
            .addCase(getAddresses.pending, (state) => {
                state.addressesLoading = "pending";
                state.error = null;
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.addressesLoading = "succeeded";
                state.addresses = action.payload.addresses;
                state.defaultAddress = action.payload.addresses.find(a => a.isDefault) || null;
                state.lastFetched = Date.now();
            })
            .addCase(getAddresses.rejected, (state, action) => {
                state.addressesLoading = "failed";
                state.error = action.payload ?? "Failed to fetch addresses";
            });

        // Get Address by ID
        builder
            .addCase(getAddressById.pending, (state) => {
                state.addressesLoading = "pending";
                state.error = null;
            })
            .addCase(getAddressById.fulfilled, (state) => {
                state.addressesLoading = "succeeded";
            })
            .addCase(getAddressById.rejected, (state, action) => {
                state.addressesLoading = "failed";
                state.error = action.payload ?? "Failed to fetch address";
            });

        // Add Address
        builder
            .addCase(addAddress.pending, (state) => {
                state.addressesLoading = "pending";
                state.error = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.addressesLoading = "succeeded";
                state.addresses.push(action.payload);
                if (action.payload.isDefault) {
                    state.defaultAddress = action.payload;
                }
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.addressesLoading = "failed";
                state.error = action.payload ?? "Failed to add address";
            });

        // Update Address
        builder
            .addCase(updateAddress.pending, (state) => {
                state.addressesLoading = "pending";
                state.error = null;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.addressesLoading = "succeeded";
                const index = state.addresses.findIndex(a => a.id === action.payload.id);
                if (index !== -1) {
                    state.addresses[index] = action.payload;
                }
                if (action.payload.isDefault) {
                    state.defaultAddress = action.payload;
                }
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.addressesLoading = "failed";
                state.error = action.payload ?? "Failed to update address";
            });

        // Delete Address
        builder
            .addCase(deleteAddress.pending, (state) => {
                state.addressesLoading = "pending";
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addressesLoading = "succeeded";
                state.addresses = state.addresses.filter(a => a.id !== action.payload.id);
                if (state.defaultAddress?.id === action.payload.id) {
                    state.defaultAddress = null;
                }
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.addressesLoading = "failed";
                state.error = action.payload ?? "Failed to delete address";
            });

        // Set Default Address
        builder
            .addCase(setDefaultAddress.pending, (state) => {
                state.addressesLoading = "pending";
                state.error = null;
            })
            .addCase(setDefaultAddress.fulfilled, (state, action) => {
                state.addressesLoading = "succeeded";
                state.defaultAddress = action.payload;
                state.addresses = state.addresses.map(a => ({
                    ...a,
                    isDefault: a.id === action.payload.id,
                }));
            })
            .addCase(setDefaultAddress.rejected, (state, action) => {
                state.addressesLoading = "failed";
                state.error = action.payload ?? "Failed to set default address";
            });

        // Get Preferences
        builder
            .addCase(getPreferences.pending, (state) => {
                state.preferencesLoading = "pending";
                state.error = null;
            })
            .addCase(getPreferences.fulfilled, (state, action) => {
                state.preferencesLoading = "succeeded";
                state.preferences = action.payload.preferences;
            })
            .addCase(getPreferences.rejected, (state, action) => {
                state.preferencesLoading = "failed";
                state.error = action.payload ?? "Failed to fetch preferences";
            });

        // Update Preferences
        builder
            .addCase(updatePreferences.pending, (state) => {
                state.preferencesLoading = "pending";
                state.error = null;
            })
            .addCase(updatePreferences.fulfilled, (state, action) => {
                state.preferencesLoading = "succeeded";
                state.preferences = action.payload;
            })
            .addCase(updatePreferences.rejected, (state, action) => {
                state.preferencesLoading = "failed";
                state.error = action.payload ?? "Failed to update preferences";
            });

        // Get Notification Settings
        builder
            .addCase(getNotificationSettings.pending, (state) => {
                state.preferencesLoading = "pending";
                state.error = null;
            })
            .addCase(getNotificationSettings.fulfilled, (state, action) => {
                state.preferencesLoading = "succeeded";
                state.notificationSettings = action.payload.settings;
            })
            .addCase(getNotificationSettings.rejected, (state, action) => {
                state.preferencesLoading = "failed";
                state.error = action.payload ?? "Failed to fetch notification settings";
            });

        // Update Notification Settings
        builder
            .addCase(updateNotificationSettings.pending, (state) => {
                state.preferencesLoading = "pending";
                state.error = null;
            })
            .addCase(updateNotificationSettings.fulfilled, (state, action) => {
                state.preferencesLoading = "succeeded";
                state.notificationSettings = action.payload;
            })
            .addCase(updateNotificationSettings.rejected, (state, action) => {
                state.preferencesLoading = "failed";
                state.error = action.payload ?? "Failed to update notification settings";
            });
    },
});

export const {
    setProfile,
    setDefaultAddressLocal,
    clearAddresses,
    clearError,
    resetUserProfileState,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
