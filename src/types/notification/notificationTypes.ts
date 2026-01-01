// ---------------- Notification Types ----------------

export type NotificationType =
    | 'booking'
    | 'payment'
    | 'order'
    | 'promotion'
    | 'service'
    | 'system';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    priority: NotificationPriority;

    // Content
    title: string;
    message: string;
    icon?: string;
    image?: string;

    // Action
    actionUrl?: string;
    actionText?: string;

    // Related Entities
    bookingId?: string;
    orderId?: string;
    paymentId?: string;

    // Metadata
    metadata?: Record<string, any>;

    // Status
    isRead: boolean;
    readAt?: string;

    // Timestamps
    createdAt: string;
    expiresAt?: string;
}

// ---------------- Filter Types ----------------

export type NotificationFilter = 'all' | 'unread' | 'booking' | 'payment' | 'order' | 'promotion';

export interface NotificationFilters {
    filter?: NotificationFilter;
    type?: NotificationType;
    isRead?: boolean;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

// ---------------- Response Types ----------------

export interface GetNotificationsResponse {
    notifications: Notification[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        limit: number;
    };
    unreadCount: number;
}

export interface UnreadCountResponse {
    unreadCount: number;
    byType: {
        [key in NotificationType]?: number;
    };
}

// ---------------- State Types ----------------

export interface NotificationState {
    // Notifications
    notifications: Notification[];
    unreadCount: number;
    unreadByType: {
        [key in NotificationType]?: number;
    };

    // Filters
    filter: NotificationFilter;

    // Loading States
    loading: "idle" | "pending" | "succeeded" | "failed";
    markingAsRead: boolean;

    // Pagination
    pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        limit: number;
    };

    // Error handling
    error: string | null;

    // Cache
    lastFetched: number | null;
}
