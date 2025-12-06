import ReturnRequest from "@/components/customer/profile/orders/tabs/spares/ReturnRequest";

export default function Page({ params }: { params: { id: string } }) {
  return <ReturnRequest id={params.id} />;
}
