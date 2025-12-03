import OrderDetails from "@/components/customer/profile/orders/tabs/services/OrderDetails";

export default async function Page({ params }: { params: { id: string } }) {
  return <OrderDetails id={(await params).id} />;
}
