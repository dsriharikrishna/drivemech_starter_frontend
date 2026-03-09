import ReturnTracking from "@/components/customer/profile/orders/tabs/spares/ReturnTracking";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ReturnTracking id={id} />;
}
