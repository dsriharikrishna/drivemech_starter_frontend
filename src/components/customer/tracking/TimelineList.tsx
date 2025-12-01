import { TimelineStep } from "@/types/timeline";
import TimelineItem from "./TimelineItem";

interface Props {
  steps: TimelineStep[];
}

export default function TimelineList({ steps }: Props) {
  return (
    <div className="mt-4">
      {steps.map((step) => (
        <TimelineItem key={step.id} step={step} />
      ))}
    </div>
  );
}
