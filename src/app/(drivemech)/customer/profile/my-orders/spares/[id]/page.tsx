import SparesOrderDetails from "@/components/customer/profile/orders/tabs/spares/SparesOrderDetails";

export default async function Page({ params }: { params: { id: string } }) {
  return <SparesOrderDetails id={(await params).id} />;
}
