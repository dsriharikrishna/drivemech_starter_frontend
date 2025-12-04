import ReturnTracking from "@/components/customer/profile/orders/tabs/spares/ReturnTracking";

export default async function Page({ params }: { params: { id: string } }) {
  return <ReturnTracking id={(await params)?.id} />;
}
