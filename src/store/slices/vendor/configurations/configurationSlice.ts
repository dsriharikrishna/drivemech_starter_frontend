import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  SystemConfig,
  FeatureFlags,
  UserPreferences,
  Integration,
  ConnectedApp,
  ApiKey,
  GeneralSettings,
  NotificationSettings,
  SecuritySettings,
} from "@/types/vendor/configurations/configuration";

// ============ Async Thunks ============
// NOTE: API endpoints are not yet developed - these are commented out for now

// Fetch system configuration
export const fetchSystemConfig = createAsyncThunk(
  "configuration/fetchSystemConfig",
  async (vendorId: string, { rejectWithValue }) => {
    try {
      // TODO: Uncomment when API is ready
      // const response = await fetch(`/api/vendors/${vendorId}/config`);
      // if (!response.ok) throw new Error('Failed to fetch config');
      // return await response.json();

      // For now, return default config
      return {
        id: "1",
        vendorId,
        businessName: "My Workshop",
        businessEmail: "contact@workshop.com",
        businessPhone: "+1234567890",
        address: {
          street: "123 Main St",
          city: "City",
          state: "State",
          postalCode: "12345",
          country: "Country",
        },
        taxSettings: {
          taxEnabled: true,
          taxRate: 10,
          taxNumber: "TAX123",
          includeTaxInPrice: false,
        },
        currency: "USD",
        timezone: "UTC",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "24h",
      } as SystemConfig;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Fetch integrations
export const fetchIntegrations = createAsyncThunk(
  "configuration/fetchIntegrations",
  async (vendorId: string, { rejectWithValue }) => {
    try {
      // TODO: Uncomment when API is ready
      // const response = await fetch(`/api/vendors/${vendorId}/integrations`);
      // if (!response.ok) throw new Error('Failed to fetch integrations');
      // return await response.json();

      return [] as Integration[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// ============ State Interface ============

interface ConfigurationState {
  // System Config
  systemConfig: SystemConfig | null;
  features: FeatureFlags;
  preferences: UserPreferences | null;

  // Integrations
  integrations: Integration[];
  connectedApps: ConnectedApp[];
  apiKeys: ApiKey[];

  // Settings
  generalSettings: GeneralSettings | null;
  notificationSettings: NotificationSettings | null;
  securitySettings: SecuritySettings | null;

  // UI State
  loading: boolean;
  error: string | null;
}

const initialState: ConfigurationState = {
  systemConfig: null,
  features: {},
  preferences: null,
  integrations: [],
  connectedApps: [],
  apiKeys: [],
  generalSettings: null,
  notificationSettings: null,
  securitySettings: null,
  loading: false,
  error: null,
};

// ============ Slice ============

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Update feature flag
    toggleFeature: (state, action: PayloadAction<string>) => {
      state.features[action.payload] = !state.features[action.payload];
    },

    // Update preferences locally
    updatePreferencesLocally: (
      state,
      action: PayloadAction<Partial<UserPreferences>>
    ) => {
      if (state.preferences) {
        state.preferences = { ...state.preferences, ...action.payload };
      }
    },

    // Update system config locally
    updateSystemConfigLocally: (
      state,
      action: PayloadAction<Partial<SystemConfig>>
    ) => {
      if (state.systemConfig) {
        state.systemConfig = { ...state.systemConfig, ...action.payload };
      }
    },

    // Add integration locally
    addIntegrationLocally: (state, action: PayloadAction<Integration>) => {
      state.integrations.push(action.payload);
    },

    // Remove integration locally
    removeIntegrationLocally: (state, action: PayloadAction<string>) => {
      state.integrations = state.integrations.filter(
        (i) => i.id !== action.payload
      );
    },

    // Add API key locally
    addApiKeyLocally: (state, action: PayloadAction<ApiKey>) => {
      state.apiKeys.push(action.payload);
    },

    // Remove API key locally
    removeApiKeyLocally: (state, action: PayloadAction<string>) => {
      state.apiKeys = state.apiKeys.filter((k) => k.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // -------- Fetch System Config --------
      .addCase(fetchSystemConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSystemConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.systemConfig = action.payload;
      })
      .addCase(fetchSystemConfig.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch system config";
      })

      // -------- Fetch Integrations --------
      .addCase(fetchIntegrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIntegrations.fulfilled, (state, action) => {
        state.loading = false;
        state.integrations = action.payload;
      })
      .addCase(fetchIntegrations.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch integrations";
      });
  },
});

// ============ Exports ============

export const {
  clearError,
  toggleFeature,
  updatePreferencesLocally,
  updateSystemConfigLocally,
  addIntegrationLocally,
  removeIntegrationLocally,
  addApiKeyLocally,
  removeApiKeyLocally,
} = configurationSlice.actions;

export default configurationSlice.reducer;
