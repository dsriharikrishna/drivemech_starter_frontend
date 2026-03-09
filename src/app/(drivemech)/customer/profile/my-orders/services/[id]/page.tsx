import OrderDetails from "@/components/customer/profile/orders/tabs/services/OrderDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderDetails id={id} />;
}
