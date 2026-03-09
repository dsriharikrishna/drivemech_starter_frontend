import SparesOrderDetails from "@/components/customer/profile/orders/tabs/spares/SparesOrderDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SparesOrderDetails id={id} />;
}
