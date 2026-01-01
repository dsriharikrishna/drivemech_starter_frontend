import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    UIState,
    ModalName,
    Toast,
    Modal,
    Theme,
} from "@/types/ui/uiTypes";

// ---------------- Initial State ----------------
const initialState: UIState = {
    // Modals
    activeModal: null,
    modalData: null,
    modalStack: [],

    // Toasts
    toasts: [],

    // Global Loading
    globalLoading: false,
    loadingMessage: "",

    // Sidebar/Navigation
    sidebarOpen: false,
    mobileMenuOpen: false,

    // Theme
    theme: "light",

    // Layout
    headerHeight: 64,
    footerHeight: 80,

    // Scroll
    scrollPosition: 0,
    isScrolled: false,

    // Responsive
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1920,

    // Search
    searchOpen: false,
    searchQuery: "",

    // Filters
    filtersOpen: false,
};

// ---------------- Slice ----------------
const uiSlice = createSlice({
    name: "ui",
    initialState,

    reducers: {
        // ---------------- Modals ----------------
        openModal: (state, action: PayloadAction<{ name: ModalName; data?: any }>) => {
            state.activeModal = action.payload.name;
            state.modalData = action.payload.data || null;
        },

        closeModal: (state) => {
            state.activeModal = null;
            state.modalData = null;
        },

        pushModal: (state, action: PayloadAction<Modal>) => {
            state.modalStack.push(action.payload);
            state.activeModal = action.payload.name;
            state.modalData = action.payload.data || null;
        },

        popModal: (state) => {
            state.modalStack.pop();
            const previousModal = state.modalStack[state.modalStack.length - 1];
            if (previousModal) {
                state.activeModal = previousModal.name;
                state.modalData = previousModal.data || null;
            } else {
                state.activeModal = null;
                state.modalData = null;
            }
        },

        closeAllModals: (state) => {
            state.activeModal = null;
            state.modalData = null;
            state.modalStack = [];
        },

        // ---------------- Toasts ----------------
        showToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
            const id = `toast-${Date.now()}-${Math.random()}`;
            state.toasts.push({ ...action.payload, id });
        },

        dismissToast: (state, action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter(t => t.id !== action.payload);
        },

        dismissAllToasts: (state) => {
            state.toasts = [];
        },

        // ---------------- Global Loading ----------------
        setGlobalLoading: (state, action: PayloadAction<{ loading: boolean; message?: string }>) => {
            state.globalLoading = action.payload.loading;
            state.loadingMessage = action.payload.message || "";
        },

        // ---------------- Sidebar/Navigation ----------------
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },

        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },

        toggleMobileMenu: (state) => {
            state.mobileMenuOpen = !state.mobileMenuOpen;
        },

        setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.mobileMenuOpen = action.payload;
        },

        // ---------------- Theme ----------------
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },

        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },

        // ---------------- Layout ----------------
        setHeaderHeight: (state, action: PayloadAction<number>) => {
            state.headerHeight = action.payload;
        },

        setFooterHeight: (state, action: PayloadAction<number>) => {
            state.footerHeight = action.payload;
        },

        // ---------------- Scroll ----------------
        setScrollPosition: (state, action: PayloadAction<number>) => {
            state.scrollPosition = action.payload;
            state.isScrolled = action.payload > 0;
        },

        setIsScrolled: (state, action: PayloadAction<boolean>) => {
            state.isScrolled = action.payload;
        },

        // ---------------- Responsive ----------------
        setScreenSize: (state, action: PayloadAction<{ width: number; height: number }>) => {
            state.screenWidth = action.payload.width;
            state.isMobile = action.payload.width < 768;
            state.isTablet = action.payload.width >= 768 && action.payload.width < 1024;
            state.isDesktop = action.payload.width >= 1024;
        },

        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload;
        },

        setIsTablet: (state, action: PayloadAction<boolean>) => {
            state.isTablet = action.payload;
        },

        setIsDesktop: (state, action: PayloadAction<boolean>) => {
            state.isDesktop = action.payload;
        },

        // ---------------- Search ----------------
        toggleSearch: (state) => {
            state.searchOpen = !state.searchOpen;
        },

        setSearchOpen: (state, action: PayloadAction<boolean>) => {
            state.searchOpen = action.payload;
        },

        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },

        // ---------------- Filters ----------------
        toggleFilters: (state) => {
            state.filtersOpen = !state.filtersOpen;
        },

        setFiltersOpen: (state, action: PayloadAction<boolean>) => {
            state.filtersOpen = action.payload;
        },

        // ---------------- Reset ----------------
        resetUIState: () => initialState,
    },
});

export const {
    // Modals
    openModal,
    closeModal,
    pushModal,
    popModal,
    closeAllModals,

    // Toasts
    showToast,
    dismissToast,
    dismissAllToasts,

    // Global Loading
    setGlobalLoading,

    // Sidebar/Navigation
    toggleSidebar,
    setSidebarOpen,
    toggleMobileMenu,
    setMobileMenuOpen,

    // Theme
    setTheme,
    toggleTheme,

    // Layout
    setHeaderHeight,
    setFooterHeight,

    // Scroll
    setScrollPosition,
    setIsScrolled,

    // Responsive
    setScreenSize,
    setIsMobile,
    setIsTablet,
    setIsDesktop,

    // Search
    toggleSearch,
    setSearchOpen,
    setSearchQuery,

    // Filters
    toggleFilters,
    setFiltersOpen,

    // Reset
    resetUIState,
} = uiSlice.actions;

export default uiSlice.reducer;
