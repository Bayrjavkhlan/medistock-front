import MedicineDetailContainer from "./container/medicine-detail.container";

export default async function MedicineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <MedicineDetailContainer id={id} />;
}
