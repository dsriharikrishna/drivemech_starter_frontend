import TowingOrderDetails from "@/components/customer/profile/orders/tabs/towing/TowingOrderDetails";

export default async function Page({ params }: { params: { id: string } }) {
  return <TowingOrderDetails id={(await params)?.id} />;
}
