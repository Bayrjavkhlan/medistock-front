import SupplyDetailContainer from "./container/supply-detail.container";

export default async function SupplyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SupplyDetailContainer id={id} />;
}
