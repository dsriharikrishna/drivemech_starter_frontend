import CustomCard from "@/components/ui/CustomCard";

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border p-2.5 bg-white">
      <h3 className="text-xs font-medium text-gray-700 mb-2">{title}</h3>
      {children}
    </div>
  );
}
