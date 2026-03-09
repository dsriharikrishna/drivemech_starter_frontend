import ModifyPolicyLayout from "../ModifyPolicyLayout";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ModifyPolicyLayout policyId={id} />;
}
