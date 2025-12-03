import SparesOrderDetails from "@/components/customer/profile/orders/tabs/spares/SparesOrderDetails";

export default function Page({ params }: { params: { id: string } }) {
  return <SparesOrderDetails id={params.id} />;
}
