import PharmacyDetailContainer from "./container/pharmacy-detail.container";

export default async function PharmacyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PharmacyDetailContainer id={id} />;
}
