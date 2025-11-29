import Image from "next/image";
import CustomCard from "../ui/CustomCard";

interface Props {
  name: string;
  rating: number;
  reviewCount: number;
  img?: string;
}

export default function BookingWorkshopCard({
  name,
  rating,
  reviewCount,
  img = "/workshop.png",
}: Props) {
  return (
    <CustomCard>
      <p className="text-sm text-gray-500 mb-2">Workshop</p>

      <div className="flex items-center gap-3">
        <Image src={img} alt="workshop" width={45} height={45} className="rounded-md" />

        <div>
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-600">
            ⭐ {rating} <span className="text-[10px]">({reviewCount})</span>
          </p>
        </div>

        <button className="ml-auto p-2 rounded-full bg-blue-100 text-blue-600">
          📞
        </button>
      </div>
    </CustomCard>
  );
}
