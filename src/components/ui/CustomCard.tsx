interface CustomCardProps {
  children: React.ReactNode;
  className?: string; 
}

export default function CustomCard({ children, className = "" }: CustomCardProps) {
  return (
    <div className={`bg-white border-border rounded-xl shadow-sm p-5 ${className}`}>
      {children}
    </div>
  );
}
