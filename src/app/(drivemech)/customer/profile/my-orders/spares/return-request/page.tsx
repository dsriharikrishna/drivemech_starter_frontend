import { ReturnRequestLayout } from "./ReturnRequestLayout";

export default function Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = searchParams?.id ?? "";

  return <ReturnRequestLayout id={id} />;
}
