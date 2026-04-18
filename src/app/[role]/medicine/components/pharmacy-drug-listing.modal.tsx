"use client";

import { useMutation } from "@apollo/client/react";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { z } from "zod";

import {
  PHARMACY_DRUG_UPSERT,
  type PharmacyDrugUpsertMutation,
  type PharmacyDrugUpsertMutationVariables,
} from "@/features/medicine/graphql/mutation.gql";
import { getApolloErrorMessage } from "@/utils/getApolloErrorMessage";

type PharmacyDrugListingModalProps = {
  open: boolean;
  drugId: string;
  initialData?: {
    quantity: number;
    price?: number | null;
    status?: string | null;
  } | null;
  onClose: () => void;
  onSuccess: () => void;
};

type ListingForm = {
  quantity: string;
  price: string;
  status: string;
};

const schema = z.object({
  quantity: z.coerce.number().min(0, "Нөөцийн тоо 0-ээс багагүй байна"),
  price: z
    .string()
    .refine((value) => value.trim() === "" || Number(value) >= 0, {
      message: "Үнэ 0-ээс багагүй байна",
    }),
  status: z.string().min(1, "Төлөв сонгоно уу"),
});

const statusOptions = [
  { value: "AVAILABLE", label: "Боломжтой" },
  { value: "LOW", label: "Нөөц багатай" },
  { value: "OUT_OF_STOCK", label: "Дууссан" },
  { value: "UNKNOWN", label: "Тодорхойгүй" },
];

export default function PharmacyDrugListingModal({
  open,
  drugId,
  initialData,
  onClose,
  onSuccess,
}: PharmacyDrugListingModalProps) {
  const [form, setForm] = useState<ListingForm>({
    quantity: "0",
    price: "",
    status: "AVAILABLE",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [upsertListing, upsertState] = useMutation<
    PharmacyDrugUpsertMutation,
    PharmacyDrugUpsertMutationVariables
  >(PHARMACY_DRUG_UPSERT);

  useEffect(() => {
    if (!open) return;

    setForm({
      quantity: String(initialData?.quantity ?? 0),
      price:
        initialData?.price != null && !Number.isNaN(initialData.price)
          ? String(initialData.price)
          : "",
      status: initialData?.status ?? "AVAILABLE",
    });
    setErrors({});
    setSubmitError(null);
  }, [initialData, open]);

  const handleSubmit = async () => {
    const validation = schema.safeParse(form);
    if (!validation.success) {
      const nextErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const key = issue.path[0] as string | undefined;
        if (key) nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);

    try {
      await upsertListing({
        variables: {
          input: {
            drugId,
            quantity: Number(form.quantity),
            price: form.price.trim() ? Number(form.price) : null,
            status: form.status,
          },
        },
      });
      onSuccess();
    } catch (error) {
      setSubmitError(
        getApolloErrorMessage(
          error,
          "Энэ эмийн сангийн нөөцийн мэдээллийг хадгалах үед алдаа гарлаа.",
        ),
      );
    }
  };

  const loading = upsertState.loading;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Эмийн сангийн нөөцийн мэдээлэл</DialogTitle>
      <DialogContent dividers>
        {submitError ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        ) : null}

        <TextField
          label="Нөөцийн тоо"
          type="number"
          fullWidth
          margin="normal"
          value={form.quantity}
          onChange={(event) =>
            setForm({ ...form, quantity: event.target.value })
          }
          error={!!errors.quantity}
          helperText={errors.quantity}
        />

        <TextField
          label="Үнэ"
          type="number"
          fullWidth
          margin="normal"
          value={form.price}
          onChange={(event) => setForm({ ...form, price: event.target.value })}
          error={!!errors.price}
          helperText={errors.price || "Хоосон үлдээж болно"}
        />

        <TextField
          select
          label="Төлөв"
          fullWidth
          margin="normal"
          value={form.status}
          onChange={(event) => setForm({ ...form, status: event.target.value })}
          error={!!errors.status}
          helperText={errors.status}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Болих
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Хадгалах
        </Button>
      </DialogActions>
    </Dialog>
  );
}
