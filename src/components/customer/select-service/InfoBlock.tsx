export default function InfoBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-2xl p-4">
      {children}
    </div>
  );
}
