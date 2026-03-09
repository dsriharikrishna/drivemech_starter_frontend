interface CustomCardProps {
  children?: React.ReactNode;
  className?: string;
  p?: string;
  onClick?: () => void;
}

export default function CustomCard({
  children,
  className = "",
  p,
  onClick,
}: CustomCardProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl ${p ?? "p-5"} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
