import Image from "next/image";
import BookingCard from "./BookingCard";

interface Props {
  name: string;
  number: string;
  img?: string;
}

export default function VehicleCard({ name, number, img = "/car.png" }: Props) {
  return (
    <BookingCard>
      <p className="text-sm text-gray-500 mb-2">Vehicle</p>

      <div className="flex items-center gap-3">
        <Image src={img} alt="vehicle" width={40} height={40} />
        <div>
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{number}</p>
        </div>
      </div>
    </BookingCard>
  );
}
