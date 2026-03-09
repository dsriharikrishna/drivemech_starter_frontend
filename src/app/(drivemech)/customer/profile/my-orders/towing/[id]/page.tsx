import TowingOrderDetails from "@/components/customer/profile/orders/tabs/towing/TowingOrderDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TowingOrderDetails id={id} />;
}
