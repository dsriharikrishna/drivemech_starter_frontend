import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// --- Interfaces based on Component Needs ---

export interface Trend {
  value: number;
  direction: "up" | "down";
}

export interface MetricItem {
  id: string; // added for key
  label: string;
  value: string;
  iconType:
    | "DollarSign"
    | "Calendar"
    | "Wrench"
    | "Clock"
    | "ShoppingBag"
    | "Package"
    | "AlertCircle"; // Mapped to icon names
  trend: Trend;
  iconBgColor: string;
  iconColor: string; // e.g. 'text-orange-600'
}

export interface Badge {
  text: string;
  color: "green" | "orange" | "purple" | "teal";
}

export interface StatusMetricItem {
  id: string; // added for key
  label: string;
  value: string;
  iconType:
    | "TrendingUp"
    | "Calendar"
    | "Users"
    | "Car"
    | "FileText"
    | "UserCheck";
  badge?: Badge;
  percentage?: string;
  iconBgColor: string;
  iconColor: string;
}

export interface RevenueDataPoint {
  month: string;
  value: number;
}

export interface ServiceRequest {
  orderId: string;
  customerName: string;
  customerImage: string;
  regNumber: string;
  makeModel: string;
  year: string;
  serviceType: string;
  walkInTime: string;
  timeAgo: string;
  date: string;
  time: string;
}

export interface DashboardState {
  workshopName: string;
  metrics: MetricItem[];
  statusMetrics: StatusMetricItem[];
  revenueTrends: RevenueDataPoint[];
  newRequests: ServiceRequest[];
  isLoading: boolean;
  error: string | null;
}

// --- Initial State ---

const initialState: DashboardState = {
  workshopName: "AutoCare Motors", // Default
  metrics: [],
  statusMetrics: [],
  revenueTrends: [],
  newRequests: [],
  isLoading: false,
  error: null,
};

// --- Async Thunk ---

// Simulating API call
export const getDashboardData = createAsyncThunk(
  "vendor/dashboard/getDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock Data Response (matches hardcoded data in components)
      const mockResponse = {
        workshopName: "AutoCare Motors",
        metrics: [
          {
            id: "1",
            iconType: "DollarSign",
            iconColor: "text-orange-600",
            value: "$1500.68",
            label: "Today's Revenue",
            trend: { value: 12.5, direction: "up" },
            iconBgColor: "bg-orange-100",
          },
          {
            id: "2",
            iconType: "Calendar",
            iconColor: "text-orange-600",
            value: "15",
            label: "Today's Bookings",
            trend: { value: 5, direction: "up" },
            iconBgColor: "bg-orange-100",
          },
          {
            id: "3",
            iconType: "Wrench",
            iconColor: "text-orange-600",
            value: "23",
            label: "Active Services",
            trend: { value: 3, direction: "up" },
            iconBgColor: "bg-orange-100",
          },
          {
            id: "4",
            iconType: "Clock",
            iconColor: "text-orange-600",
            value: "8",
            label: "Pending Services",
            trend: { value: 2, direction: "down" },
            iconBgColor: "bg-orange-100",
          },
          {
            id: "5",
            iconType: "ShoppingBag",
            iconColor: "text-blue-600",
            value: "12",
            label: "New Orders",
            trend: { value: 4, direction: "up" },
            iconBgColor: "bg-blue-100",
          },
          {
            id: "6",
            iconType: "Package",
            iconColor: "text-blue-600",
            value: "18",
            label: "Pending Dispatch",
            trend: { value: 3, direction: "down" },
            iconBgColor: "bg-blue-100",
          },
          {
            id: "7",
            iconType: "AlertCircle",
            iconColor: "text-red-600",
            value: "6",
            label: "Active Requests",
            trend: { value: 2, direction: "up" },
            iconBgColor: "bg-red-100",
          },
        ],
        statusMetrics: [
          {
            id: "s1",
            iconType: "TrendingUp",
            iconColor: "text-blue-600",
            value: "45",
            label: "Next Day Services",
            percentage: "+12%",
            badge: { text: "", color: "green" },
            iconBgColor: "bg-blue-100",
          },
          {
            id: "s2",
            iconType: "Calendar",
            iconColor: "text-green-600",
            value: "12",
            label: "Bookings",
            badge: { text: "Today", color: "green" },
            iconBgColor: "bg-green-100",
          },
          {
            id: "s3",
            iconType: "Users",
            iconColor: "text-purple-600",
            value: "328",
            label: "Total Customers",
            badge: { text: "Active", color: "orange" },
            iconBgColor: "bg-purple-100",
          },
          {
            id: "s4",
            iconType: "Car",
            iconColor: "text-orange-600",
            value: "456",
            label: "Vehicles Registered",
            badge: { text: "Active", color: "orange" },
            iconBgColor: "bg-orange-100",
          },
          {
            id: "s5",
            iconType: "FileText",
            iconColor: "text-blue-600",
            value: "89",
            label: "Invoices Issued",
            badge: { text: "This Month", color: "purple" },
            iconBgColor: "bg-blue-100",
          },
          {
            id: "s6",
            iconType: "UserCheck",
            iconColor: "text-teal-600",
            value: "24",
            label: "Team Members",
            badge: { text: "Active", color: "teal" },
            iconBgColor: "bg-teal-100",
          },
        ],
        revenueTrends: [
          { month: "JAN", value: 400 },
          { month: "FEB", value: 300 },
          { month: "MAR", value: 600 },
          { month: "APR", value: 500 },
          { month: "MAY", value: 810 },
          { month: "JUN", value: 900 },
          { month: "JUL", value: 700 },
          { month: "AUG", value: 850 },
          { month: "SEP", value: 600 },
          { month: "OCT", value: 650 },
          { month: "NOV", value: 550 },
          { month: "DEC", value: 400 },
        ],
        newRequests: [
          {
            orderId: "123456789",
            customerName: "Ramesh Babu",
            customerImage: "",
            regNumber: "ABC 112 D",
            makeModel: "Suzuki Baleno ZLX",
            year: "2020",
            serviceType: "Periodic Service",
            walkInTime: "3:00 PM - 5:00 PM",
            timeAgo: "10 Mins",
            date: "2024-01-23",
            time: "1:00 PM",
          },
          {
            orderId: "987654321", // Changed ID for variety
            customerName: "Suresh Kumar", // Changed name for variety
            customerImage: "",
            regNumber: "XYZ 888 A",
            makeModel: "Honda City",
            year: "2021",
            serviceType: "General Checkup",
            walkInTime: "1:00 PM - 2:00 PM",
            timeAgo: "5 Mins",
            date: "2024-01-23",
            time: "1:00 PM",
          },
        ],
      };

      return mockResponse;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch dashboard data");
    }
  }
);

// --- Slice ---

const dashboardSlice = createSlice({
  name: "vendorDashboard",
  initialState,
  reducers: {
    // Add synchronous actions here if needed (e.g. clear errors)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getDashboardData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.workshopName = action.payload.workshopName;
          state.metrics = action.payload.metrics;
          state.statusMetrics = action.payload.statusMetrics;
          state.revenueTrends = action.payload.revenueTrends;
          state.newRequests = action.payload.newRequests;
        }
      )
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
