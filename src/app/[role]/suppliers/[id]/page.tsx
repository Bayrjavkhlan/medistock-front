import SupplierDetailContainer from "./container/supplier-detail.container";

export default async function SupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SupplierDetailContainer id={id} />;
}
