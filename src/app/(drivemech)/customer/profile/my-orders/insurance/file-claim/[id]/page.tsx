import FileClaimLayout from "../FileClaimLayout";

export default function Page({ params }: { params: { id: string } }) {
  return <FileClaimLayout policyId={params.id} />;
}
