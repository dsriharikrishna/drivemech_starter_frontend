export default function MobileAppPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">DriveMech Mobile App</h2>

      <p className="text-gray-600">
        Download our app for faster service, real-time tracking, and quick bookings.
      </p>

      <div className="flex gap-4">
        <button className="px-5 py-2 bg-black text-white rounded-lg">
          Google Play
        </button>
        <button className="px-5 py-2 bg-gray-800 text-white rounded-lg">
          App Store
        </button>
      </div>
    </div>
  );
}
