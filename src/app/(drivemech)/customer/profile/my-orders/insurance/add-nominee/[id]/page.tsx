import AddNomineeLayout from "../AddNomineeLayout";

export default function Page({ params }: { params: { id: string } }) {
  return <AddNomineeLayout policyId={params.id} />;
}
