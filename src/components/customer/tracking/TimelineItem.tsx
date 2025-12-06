import { CheckCircle, Circle } from "lucide-react";
import { TimelineStep } from "@/types/timeline";

interface Props {
  step: TimelineStep;
}

export default function TimelineItem({ step }: Props) {
  const { title, description, date, isActive, isCompleted } = step;

  const icon = isCompleted ? (
    <CheckCircle className="text-green-500 w-5 h-5" />
  ) : (
    <Circle
      className={`w-5 h-5 ${
        isActive ? "text-green-500" : "text-gray-400"
      }`}
    />
  );

  return (
    <div className="grid grid-cols-12 items-start gap-3 py-2">
      {/* ICON */}
      <div className="col-span-1 flex justify-center pt-1">
        {icon}
      </div>

      {/* TEXT */}
      <div className="col-span-8">
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {/* TIME */}
      <div className="col-span-3 text-right">
        <p
          className={`text-sm ${
            isCompleted || isActive ? "text-green-500" : "text-gray-400"
          }`}
        >
          {date}
        </p>
      </div>
    </div>
  );
}