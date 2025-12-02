export default function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: "bg-green-100 text-green-600",
    'in-progress': "bg-yellow-100 text-yellow-600",
    cancelled: "bg-red-100 text-red-600",
  };
  const labels: Record<string, string> = {
    completed: "Completed",
    'in-progress': "In Progress",
    cancelled: "Cancelled",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`}
    >
      {labels[status] || status}
    </span>
  );
}
