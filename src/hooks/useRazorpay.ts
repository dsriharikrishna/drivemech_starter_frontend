import { useCallback } from "react";

interface UseRazorpayOptions {
    keyId: string;
    name?: string;
    description?: string;
    image?: string;
    currency?: string;
    themeColor?: string;
}

interface OpenRazorpayOptions {
    amount: number;          // in paise (e.g. ₹500 → 50000)
    orderId?: string;        // from backend Razorpay order
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: Record<string, string>;
    onSuccess: (response: RazorpayPaymentResponse) => void;
    onDismiss?: () => void;
}

/**
 * Loads the Razorpay checkout script if not already present,
 * then opens the payment modal.
 */
export function useRazorpay(opts: UseRazorpayOptions) {
    const loadScript = useCallback((): Promise<boolean> => {
        return new Promise((resolve) => {
            if (typeof window !== "undefined" && window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }, []);

    const openCheckout = useCallback(
        async ({
            amount,
            orderId,
            prefill,
            notes,
            onSuccess,
            onDismiss,
        }: OpenRazorpayOptions) => {
            const loaded = await loadScript();
            if (!loaded) {
                throw new Error("Razorpay SDK failed to load. Check your internet connection.");
            }

            const options: RazorpayOptions = {
                key: opts.keyId,
                amount,
                currency: opts.currency ?? "INR",
                name: opts.name ?? "DriveMech",
                description: opts.description ?? "Service Booking Payment",
                image: opts.image,
                order_id: orderId,
                prefill,
                notes,
                theme: {
                    color: opts.themeColor ?? "#f97316", // orange-500
                },
                modal: {
                    ondismiss: onDismiss,
                    escape: true,
                },
                handler: onSuccess,
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        },
        [loadScript, opts]
    );

    return { openCheckout };
}
