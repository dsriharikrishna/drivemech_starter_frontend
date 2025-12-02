import Image from "next/image";

type Status = "Completed" | "In Progress" | "Cancelled";

interface OrderCardProps {
  garageName: string;
  orderId: string;
  date: string;
  registration: string;
  bookedItems: { label: string; price: number }[];
  status: Status;
  image: string;
}

const statusStyles: Record<Status, string> = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrderCard({
  garageName,
  orderId,
  date,
  registration,
  bookedItems,
  status,
  image,
}: OrderCardProps) {
  const total = bookedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <Image
          src={image}
          width={70}
          height={70}
          alt="garage"
          className="rounded-lg object-cover"
        />

        <div className="w-full">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">{garageName}</p>
              <p className="text-blue-600 text-sm font-medium">{orderId}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${statusStyles[status]}`}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-current" />
              {status}
            </span>
          </div>

          <div className="grid grid-cols-2 mt-4 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Date & Time</p>
              <p className="font-medium">{date}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Registration No.</p>
              <p className="font-medium">{registration}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 mt-6 border-t pt-4">
            <div>
              <p className="font-semibold mb-2">Services Booked</p>
              <ul className="space-y-1 text-sm">
                {bookedItems.map((item) => (
                  <li key={item.label} className="flex justify-between">
                    <span>• {item.label}</span>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-end justify-end">
              <p className="text-orange-500 font-semibold text-xl">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
