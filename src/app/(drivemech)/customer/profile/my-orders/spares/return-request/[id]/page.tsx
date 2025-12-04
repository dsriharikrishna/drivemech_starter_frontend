import { ReturnRequest } from "@/components/customer/profile/orders/tabs/spares/ReturnRequest";

export default async function Page({ params }: { params: { id: string } }) {
  return <ReturnRequest id={(await params)?.id} />;
}
