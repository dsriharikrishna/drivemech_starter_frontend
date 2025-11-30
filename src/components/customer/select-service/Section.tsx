import CustomCard from "@/components/ui/CustomCard";

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border p-3 bg-white">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      {children}
    </div>
  );
}
