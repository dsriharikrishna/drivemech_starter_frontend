export default function CustomCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border-border rounded-xl shadow-sm p-5">
      {children}
    </div>
  );
}
