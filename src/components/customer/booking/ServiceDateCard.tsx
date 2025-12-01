import CustomCard from "@/components/ui/CustomCard";
import { CalendarIcon } from "lucide-react";

interface Props {
  date: string;
  time: string;
  onReschedule?: () => void;
}

export default function ServiceDateCard({ date, time, onReschedule }: Props) {
  return (
    <CustomCard>
      <p className="text-sm text-gray-500 mb-2">Service Date & Time</p>

      <div className="flex items-start gap-3 border-border ">
        <CalendarIcon className="w-10 h-10 text-gray-700" />

        <div>
          <p className="font-medium text-gray-800">{date}</p>
          <p className="text-xs text-gray-500">{time}</p>

          {onReschedule && (
            <button
              onClick={onReschedule}
              className="mt-2 px-2 py-1 text-xs rounded-md bg-red-100 text-red-500"
            >
              Reschedule
            </button>
          )}
        </div>
      </div>
    </CustomCard>
  );
}
