"use client";

import { useQuery } from "@apollo/client/react";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import { Alert, Box, Chip, Stack, Typography } from "@mui/material";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import DetailFactGrid from "@/components/detail/DetailFactGrid";
import DetailMetricCard from "@/components/detail/DetailMetricCard";
import DetailPageShell from "@/components/detail/DetailPageShell";
import DetailSectionCard from "@/components/detail/DetailSectionCard";
import {
  DrugDetailDocument,
  type DrugDetailQuery,
  type DrugDetailQueryVariables,
} from "@/features/medicine/graphql/queries.gql";
import {
  formatAddress,
  formatDateTime,
  formatNullable,
  formatPrice,
} from "@/utils/detailFormatters";

type MedicineDetailContainerProps = {
  id: string;
};

const statusLabelMap: Record<string, string> = {
  AVAILABLE: "Боломжтой",
  LOW: "Нөөц багатай",
  OUT_OF_STOCK: "Дууссан",
  UNKNOWN: "Тодорхойгүй",
};

export default function MedicineDetailContainer({
  id,
}: MedicineDetailContainerProps) {
  const subject = "Pharmacy_Medicine";

  const { data, loading, error } = useQuery<
    DrugDetailQuery,
    DrugDetailQueryVariables
  >(DrugDetailDocument, {
    variables: { drugDetailId: id },
    fetchPolicy: "no-cache",
  });

  const drug = data?.drugDetail;

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Эмийн мэдээллийг уншиж байна..." loading />
      ) : error ? (
        <StateView
          title="Эмийн мэдээлэл ачаалахад алдаа гарлаа"
          description={error.message}
        />
      ) : !drug ? (
        <StateView
          title="Эмийн мэдээлэл олдсонгүй"
          description="Хүссэн эмийн бүртгэл байхгүй эсвэл харах эрх хүрэлцэхгүй байна."
        />
      ) : (
        <DetailPageShell
          title={drug.name ?? "Эмийн дэлгэрэнгүй"}
          subtitle="Тухайн эмийн үндсэн тайлбар, фармацийн мэдээлэл, үнийн доод дүн болон салбарын нөөцийн төлөвийг нэг дор харуулна."
          typeLabel="Эм"
          meta={[
            `Шинэчлэгдсэн: ${formatDateTime(drug.updatedAt)}`,
            `Бүртгэсэн: ${formatDateTime(drug.createdAt)}`,
          ]}
          aside={
            <>
              <DetailMetricCard
                label="Нийт нөөц"
                value={`${drug.totalStock} ширхэг`}
                tone={drug.totalStock > 0 ? "success" : "warning"}
              />
              <DetailMetricCard
                label="Доод үнэ"
                value={
                  drug.startingPrice != null
                    ? `${formatPrice(drug.startingPrice)} ₮`
                    : "Бүртгэгдээгүй"
                }
              />
              <DetailMetricCard
                label="Олдоцтой салбар"
                value={`${drug.availabilityCount}`}
                tone={drug.availabilityCount > 0 ? "success" : "warning"}
              />
            </>
          }
        >
          <DetailSectionCard
            title="Эмийн мэдээлэл"
            description="Каталогийн үндсэн мэдээлэл болон хэрэглэгчид харагдах тайлбар."
            eyebrow="Профайл"
          >
            <DetailFactGrid
              items={[
                { label: "Эмийн нэр", value: formatNullable(drug.name) },
                {
                  label: "Ерөнхий нэр",
                  value: formatNullable(drug.genericName),
                },
                {
                  label: "Брэнд / үйлдвэрлэгч",
                  value: formatNullable(drug.manufacturer),
                },
                { label: "Хэлбэр", value: formatNullable(drug.dosageForm) },
                { label: "Тун / хүч", value: formatNullable(drug.strength) },
                {
                  label: "Доод үнэ",
                  value:
                    drug.startingPrice != null
                      ? `${formatPrice(drug.startingPrice)} ₮`
                      : "Бүртгэгдээгүй",
                },
                { label: "Нийт нөөц", value: `${drug.totalStock} ширхэг` },
                {
                  label: "Системд бүртгэлтэй салбар",
                  value: `${drug.availabilityCount}`,
                },
              ]}
            />
          </DetailSectionCard>

          <DetailSectionCard
            title="Тайлбар ба хэрэглээ"
            description="Системд бүртгэгдсэн эмийн тайлбарыг эмнэлгийн чиглэлийн цэвэр харагдацтайгаар үзүүлнэ."
            eyebrow="Тайлбар"
          >
            <Stack spacing={2.5}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: "rgba(248,250,252,0.95)",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Дэлгэрэнгүй тайлбар
                </Typography>
                <Typography sx={{ lineHeight: 1.8 }}>
                  {formatNullable(drug.description)}
                </Typography>
              </Box>
              <Alert severity="info" sx={{ borderRadius: 3 }}>
                Ангилал, заалт, анхааруулга, гаж нөлөө зэрэг нэмэлт агуулгын
                талбарууд одоогоор өгөгдлийн санд тусдаа байхгүй байна. Тиймээс
                энэ хуудас бодитоор хадгалагдсан мэдээллийг л найдвартай харуулж
                байна.
              </Alert>
            </Stack>
          </DetailSectionCard>

          <DetailSectionCard
            title="Салбарууд дахь нөөц, үнэ"
            description="Тухайн эм аль эмийн санд хэдэн ширхэг байгаа, ямар үнэтэй байгааг салбар тус бүрээр үзүүлнэ."
            eyebrow="Нөөц"
          >
            {drug.availability.length === 0 ? (
              <StateView
                title="Энэ эмийн салбарын нөөц бүртгэгдээгүй байна"
                description="Нөөцийн мэдээлэл орж ирмэгц энэ хэсэг автоматаар шинэчлэгдэнэ."
              />
            ) : (
              <Stack spacing={2}>
                {drug.availability.map((entry) => {
                  const addressText = formatAddress([
                    entry.address?.address1,
                    entry.address?.address2,
                    entry.address?.province,
                  ]);

                  return (
                    <Box
                      key={entry.id}
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
                      }}
                    >
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", md: "center" }}
                      >
                        <Box>
                          <Typography variant="h6" fontWeight={800}>
                            {entry.pharmacyName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {addressText || "Хаяг бүртгэгдээгүй"}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 0.75, display: "block" }}
                          >
                            Сүүлд шинэчилсэн: {formatDateTime(entry.updatedAt)}
                          </Typography>
                        </Box>
                        <Stack
                          direction="row"
                          spacing={1}
                          useFlexGap
                          flexWrap="wrap"
                        >
                          <Chip
                            icon={<Inventory2RoundedIcon />}
                            label={`${entry.quantity} ширхэг`}
                            sx={{ fontWeight: 700 }}
                          />
                          <Chip
                            icon={<SellRoundedIcon />}
                            label={
                              entry.price != null
                                ? `${formatPrice(entry.price)} ₮`
                                : "Үнэ бүртгэгдээгүй"
                            }
                            sx={{ fontWeight: 700 }}
                          />
                          <Chip
                            icon={<MedicationRoundedIcon />}
                            label={
                              statusLabelMap[entry.status ?? ""] ??
                              "Тодорхойгүй"
                            }
                            sx={{
                              fontWeight: 700,
                              bgcolor:
                                entry.quantity > 0
                                  ? "rgba(34,197,94,0.12)"
                                  : "rgba(249,115,22,0.12)",
                            }}
                          />
                        </Stack>
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            )}
          </DetailSectionCard>
        </DetailPageShell>
      )}
    </AbilityGuard>
  );
}
