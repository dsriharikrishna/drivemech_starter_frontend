import CustomCard from "../ui/CustomCard";

interface Props {
  bookingId: string;
  status: string; // Confirmed / Pending / Cancelled
}

export default function BookingIdCard({ bookingId, status }: Props) {
  const statusColor = {
    Confirmed: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Cancelled: "bg-red-100 text-red-600",
  }[status];

  return (
    <CustomCard>
      <p className="text-sm text-gray-500 mb-2">Booking ID</p>

      <div className="flex items-center gap-3 border-border">
        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-lg">
          #
        </div>

        <div>
          <p className="font-semibold text-blue-600">{bookingId}</p>

          <span className={`px-2 py-1 text-xs rounded-md ${statusColor}`}>
            {status}
          </span>
        </div>
      </div>
    </CustomCard>
  );
}
