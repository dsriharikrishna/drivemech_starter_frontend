import ReturnRequest from "@/components/customer/profile/orders/tabs/spares/ReturnRequest";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ReturnRequest id={id} />;
}
