import CustomCard from "@/components/ui/CustomCard";
import Image from "next/image";

export default function ServiceHeaderCard() {
  return (
    <CustomCard>
      <h2 className="text-[16px] font-semibold mb-1">A to Z Services</h2>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="text-yellow-500 font-semibold">4.5 ★</span>
        <span>1200</span>
        <span>•</span>
        <span>Auto Repair Shop</span>
      </div>

      <div className="flex items-center gap-2 text-sm mt-1">
        <span className="text-green-600 font-medium">Open</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-500">Closes 9:30 PM</span>
      </div>

      <Image
        src="/images/car-service.jpg"
        alt="service"
        width={500}
        height={200}
        className="rounded-xl mt-3 w-full object-cover"
      />
      
    </CustomCard>
  );
}
