interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
  p?: string;  
}

export default function CustomCard({ children, className = "", p }: CustomCardProps) {
  return (
    <div
      className={`bg-white border-border rounded-xl ${p ?? "p-5"} ${className}`}
    >
      {children}
    </div>
  );
}
