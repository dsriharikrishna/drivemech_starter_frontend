import { WorkshopCardProps } from "@/types/workshops";
import WorkshopCard from "./WorkshopCard";

export default function WorkshopList({ data }: { data: WorkshopCardProps[] }) {
  return (
    <section className="w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Top Recommended Workshops For You
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
        {data.map((item, idx) => (
          <WorkshopCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}
