// Global Razorpay browser SDK type declarations

interface RazorpayOptions {
    key: string;
    amount: number;          // in paise (INR smallest unit)
    currency?: string;
    name?: string;
    description?: string;
    image?: string;
    order_id?: string;       // from your backend Razorpay order
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
        color?: string;
    };
    modal?: {
        ondismiss?: () => void;
        escape?: boolean;
        backdropclose?: boolean;
    };
    handler?: (response: RazorpayPaymentResponse) => void;
}

interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
}

interface RazorpayInstance {
    open(): void;
    close(): void;
    on(event: string, handler: (...args: any[]) => void): void;
}

interface RazorpayConstructor {
    new(options: RazorpayOptions): RazorpayInstance;
}

interface Window {
    Razorpay: RazorpayConstructor;
}
