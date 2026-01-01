// ---------------- UI State Types ----------------

export type ModalName =
    | 'login'
    | 'register'
    | 'forgotPassword'
    | 'vehicleSelector'
    | 'addressSelector'
    | 'paymentMethod'
    | 'confirmBooking'
    | 'cancelBooking'
    | 'rateService'
    | 'imageViewer'
    | 'confirmDialog'
    | null;

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number; // in milliseconds
    action?: {
        label: string;
        onClick: () => void;
    };
}

export interface Modal {
    name: ModalName;
    data?: any;
    onClose?: () => void;
}

// ---------------- Theme Types ----------------

export type Theme = 'light' | 'dark' | 'system';

// ---------------- UI State ----------------

export interface UIState {
    // Modals
    activeModal: ModalName;
    modalData: any;
    modalStack: Modal[]; // for nested modals

    // Toasts/Alerts
    toasts: Toast[];

    // Global Loading
    globalLoading: boolean;
    loadingMessage: string;

    // Sidebar/Navigation
    sidebarOpen: boolean;
    mobileMenuOpen: boolean;

    // Theme
    theme: Theme;

    // Layout
    headerHeight: number;
    footerHeight: number;

    // Scroll
    scrollPosition: number;
    isScrolled: boolean;

    // Responsive
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    screenWidth: number;

    // Search
    searchOpen: boolean;
    searchQuery: string;

    // Filters
    filtersOpen: boolean;
}
