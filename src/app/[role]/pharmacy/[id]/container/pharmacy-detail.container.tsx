"use client";

import { useQuery } from "@apollo/client/react";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { Alert, Chip, Stack } from "@mui/material";
import { useSession } from "next-auth/react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import DetailFactGrid from "@/components/detail/DetailFactGrid";
import DetailMetricCard from "@/components/detail/DetailMetricCard";
import DetailPageShell from "@/components/detail/DetailPageShell";
import DetailSectionCard from "@/components/detail/DetailSectionCard";
import EntityLocationMap from "@/components/detail/EntityLocationMap";
import {
  PharmacyDetailDocument,
  type PharmacyDetailQuery,
  type PharmacyDetailQueryVariables,
} from "@/features/pharmacy/graphql/queries.gql";
import { getPharmacySubjectForRole, getPortalRole } from "@/lib/casl";
import {
  formatAddress,
  formatDateTime,
  formatNullable,
} from "@/utils/detailFormatters";

type PharmacyDetailContainerProps = {
  id: string;
};

export default function PharmacyDetailContainer({
  id,
}: PharmacyDetailContainerProps) {
  const { data: session } = useSession();
  const portalRole = getPortalRole(session?.user ?? null, null);
  const subject = getPharmacySubjectForRole(portalRole);

  const { data, loading, error } = useQuery<
    PharmacyDetailQuery,
    PharmacyDetailQueryVariables
  >(PharmacyDetailDocument, {
    variables: { pharmacyDetailId: id },
    fetchPolicy: "no-cache",
  });

  const pharmacy = data?.pharmacyDetail;
  const addressText = formatAddress([
    pharmacy?.address?.address1,
    pharmacy?.address?.address2,
    pharmacy?.address?.province,
  ]);

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Эмийн сангийн мэдээллийг уншиж байна..." loading />
      ) : error ? (
        <StateView
          title="Эмийн сангийн мэдээлэл ачаалахад алдаа гарлаа"
          description={error.message}
        />
      ) : !pharmacy ? (
        <StateView
          title="Эмийн сангийн мэдээлэл олдсонгүй"
          description="Хүссэн эмийн сангийн бүртгэл байхгүй эсвэл харах эрх хүрэлцэхгүй байна."
        />
      ) : (
        <DetailPageShell
          title={pharmacy.name ?? "Эмийн сангийн дэлгэрэнгүй"}
          subtitle="Хаяг, холбоо барих суваг болон байршлын мэдээллийг цэвэр, ойлгомжтой байдлаар харуулна."
          typeLabel="Эмийн сан"
          meta={[
            `Шинэчлэгдсэн: ${formatDateTime(pharmacy.updatedAt)}`,
            `Бүртгэсэн: ${formatDateTime(pharmacy.createdAt)}`,
          ]}
          aside={
            <>
              <DetailMetricCard
                label="Бүртгэлийн төлөв"
                value="Идэвхтэй"
                tone="success"
              />
              <DetailMetricCard
                label="Байршлын мэдээлэл"
                value={
                  pharmacy.address?.latitude != null &&
                  pharmacy.address?.longitude != null
                    ? "Бэлэн"
                    : "Дутуу"
                }
                tone={
                  pharmacy.address?.latitude != null &&
                  pharmacy.address?.longitude != null
                    ? "success"
                    : "warning"
                }
              />
              <DetailSectionCard
                title="Хурдан мэдээлэл"
                description="Хэрэглэгчид хэрэгтэй товч мэдээлэл."
                eyebrow="Тойм"
              >
                <Stack spacing={1.5}>
                  <Chip
                    icon={<PhoneRoundedIcon />}
                    label={`Утас: ${formatNullable(pharmacy.phone)}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<MailRoundedIcon />}
                    label={`И-мэйл: ${formatNullable(pharmacy.email)}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<LocalPharmacyRoundedIcon />}
                    label={`Хаяг: ${addressText || "Бүртгэгдээгүй"}`}
                    variant="outlined"
                  />
                </Stack>
              </DetailSectionCard>
            </>
          }
        >
          <DetailSectionCard
            title="Үндсэн мэдээлэл"
            description="Эмийн сангийн холбоо барих болон байршлын үндсэн мэдээлэл."
            eyebrow="Мэдээлэл"
          >
            <DetailFactGrid
              items={[
                {
                  label: "Эмийн сангийн нэр",
                  value: formatNullable(pharmacy.name),
                },
                { label: "И-мэйл", value: formatNullable(pharmacy.email) },
                { label: "Утас", value: formatNullable(pharmacy.phone) },
                { label: "Хаяг", value: addressText || "Бүртгэгдээгүй" },
                { label: "Ажиллах цаг", value: "Системд бүртгэгдээгүй" },
                { label: "Тайлбар", value: "Системд бүртгэгдээгүй" },
              ]}
            />
          </DetailSectionCard>

          <EntityLocationMap
            title="Эмийн сангийн байршил"
            entityLabel="Эмийн сан"
            entityName={pharmacy.name ?? "Эмийн сан"}
            entityAddress={addressText || "Хаяг бүртгэгдээгүй"}
            latitude={pharmacy.address?.latitude}
            longitude={pharmacy.address?.longitude}
          />

          <DetailSectionCard
            title="Анхаарах зүйлс"
            description="Мэдээлэл дутуу байлаа ч хэрэглэгчийн туршлагыг тогтвортой байлгана."
            eyebrow="Тайлбар"
          >
            <Alert severity="info" sx={{ borderRadius: 3 }}>
              Ажиллах цаг, тайлбар зэрэг нэмэлт талбарууд одоогоор өгөгдлийн
              санд байхгүй тул энд байгаа мэдээлэл нь таны системд бодитоор
              хадгалагдсан талбарууд дээр тулгуурласан.
            </Alert>
          </DetailSectionCard>
        </DetailPageShell>
      )}
    </AbilityGuard>
  );
}
