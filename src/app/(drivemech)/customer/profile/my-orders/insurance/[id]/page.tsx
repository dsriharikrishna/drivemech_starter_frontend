import PolicyDetailsPage from "@/components/customer/profile/orders/tabs/insurance/PolicyDetailsPage";

export default function Page({ params }: { params: { id: string } }) {
  return <PolicyDetailsPage id={params.id} />;
}
