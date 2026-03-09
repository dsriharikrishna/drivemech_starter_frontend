declare global {
    interface Window {
        addToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
    }
}

export { };