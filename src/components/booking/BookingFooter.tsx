export default function BookingFooter() {
  return (
    <>
      <footer className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
        <button className="bg-red-500 text-white py-3 px-6 rounded-lg w-full md:w-1/3">
          Cancel Booking
        </button>

        <button className="bg-green-600 text-white py-3 px-6 rounded-lg w-full md:w-1/3">
          Download Invoice
        </button>

        <button className="bg-orange-500 text-white py-3 px-6 rounded-lg w-full md:w-1/3">
          Contact Workshop
        </button>
      </footer>
      
      <div className="text-center mt-6 text-gray-600">
        Need assistance? Chat with Us or Call 123-456-7890
      </div>
    </>
  );
}
