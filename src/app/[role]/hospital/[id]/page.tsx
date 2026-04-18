import HospitalDetailContainer from "./container/hospital-detail.container";

export default async function HospitalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <HospitalDetailContainer id={id} />;
}
