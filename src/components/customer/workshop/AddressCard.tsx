
export default function AddressCard() {
    return (
        <div className="p-2">
            <div className="flex flex-row gap-2 justify-between items-center mb-2">
                <h3 className="font-semibold text-md">Address</h3>
                <button className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg border border-blue-100">
                    Get Directions
                </button>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                H.No. 3-6, 56/2, Rampally, Indira Nagar,
                Chennai Ready Nagar, Hyderabad.
            </p>
        </div>
    );
}
