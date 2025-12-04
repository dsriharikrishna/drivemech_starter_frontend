import ModifyPolicyLayout from "../ModifyPolicyLayout";

export default function Page({ params }: { params: { id: string } }) {
  return <ModifyPolicyLayout policyId={params.id} />;
}
