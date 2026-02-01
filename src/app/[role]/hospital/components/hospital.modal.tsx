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
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import {
  HOSPITAL_CREATE,
  HOSPITAL_UPDATE,
} from "@/features/hospital/graphql/mutation.gql";
import type { Hospital } from "@/generated/graphql";

type HospitalForm = {
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  province: string;
};

type HospitalModalProps = {
  open: boolean;
  mode: "create" | "update";
  initialData?: Hospital | null;
  onClose: () => void;
  onSuccess: () => void;
};

const schema = z.object({
  name: z.string().min(1, "Нэр шаардлагатай"),
  email: z.string().email("Имэйл буруу байна"),
  phone: z.string().min(1, "Утас шаардлагатай"),
  address1: z.string().min(1, "Хаяг шаардлагатай"),
  address2: z.string().optional(),
  province: z.string().min(1, "Аймаг/дүүрэг шаардлагатай"),
});

const emptyForm: HospitalForm = {
  name: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  province: "",
};

export default function HospitalModal({
  open,
  mode,
  initialData,
  onClose,
  onSuccess,
}: HospitalModalProps) {
  const [form, setForm] = useState<HospitalForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [createHospital, createState] = useMutation(HOSPITAL_CREATE);
  const [updateHospital, updateState] = useMutation(HOSPITAL_UPDATE);

  const loading = createState.loading || updateState.loading;
  const error = createState.error || updateState.error;

  useEffect(() => {
    if (!open) return;
    if (mode === "update" && initialData) {
      setForm({
        name: initialData.name ?? "",
        email: initialData.email ?? "",
        phone: initialData.phone ?? "",
        address1: initialData.address?.address1 ?? "",
        address2: initialData.address?.address2 ?? "",
        province: initialData.address?.province ?? "",
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [open, mode, initialData]);

  const title = useMemo(
    () => (mode === "create" ? "Эмнэлэг үүсгэх" : "Эмнэлэг шинэчлэх"),
    [mode],
  );

  const submitLabel = mode === "create" ? "Үүсгэх" : "Шинэчлэх";

  const validate = () => {
    const result = schema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const nextErrors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const key = issue.path[0] as string | undefined;
      if (key) nextErrors[key] = issue.message;
    });
    setErrors(nextErrors);
    return false;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const input = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: {
        address1: form.address1,
        address2: form.address2 || undefined,
        province: form.province,
      },
    };

    if (mode === "create") {
      await createHospital({ variables: { input } });
    } else if (initialData?.id) {
      await updateHospital({
        variables: { hospitalUpdateId: initialData.id, input },
      });
    }

    onSuccess();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        <TextField
          label="Нэр"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Имэйл"
          fullWidth
          margin="normal"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Утас"
          fullWidth
          margin="normal"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          label="Хаяг 1"
          fullWidth
          margin="normal"
          value={form.address1}
          onChange={(e) => setForm({ ...form, address1: e.target.value })}
          error={!!errors.address1}
          helperText={errors.address1}
        />

        <TextField
          label="Хаяг 2"
          fullWidth
          margin="normal"
          value={form.address2}
          onChange={(e) => setForm({ ...form, address2: e.target.value })}
          error={!!errors.address2}
          helperText={errors.address2}
        />

        <TextField
          label="Аймаг/Дүүрэг"
          fullWidth
          margin="normal"
          value={form.province}
          onChange={(e) => setForm({ ...form, province: e.target.value })}
          error={!!errors.province}
          helperText={errors.province}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Болих
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
