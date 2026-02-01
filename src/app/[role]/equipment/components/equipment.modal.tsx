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
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import {
  EQUIPMENT_CREATE,
  EQUIPMENT_UPDATE,
} from "@/features/equipment/graphql/mutations.gql";
import type { Equipment, Hospital } from "@/generated/graphql";
import { EquipmentCategory, EquipmentState } from "@/generated/graphql";

type EquipmentForm = {
  name: string;
  serialNo: string;
  category: EquipmentCategory | "";
  state: EquipmentState | "";
  hospitalId: string;
};

type EquipmentModalProps = {
  open: boolean;
  mode: "create" | "update";
  initialData?: Equipment | null;
  hospitals: Hospital[];
  onClose: () => void;
  onSuccess: () => void;
};

const schema = z.object({
  name: z.string().min(1, "Нэр шаардлагатай"),
  serialNo: z.string().min(1, "Сериал дугаар шаардлагатай"),
  category: z.string().min(1, "Төрөл сонгоно уу"),
  state: z.string().min(1, "Төлөв сонгоно уу"),
  hospitalId: z.string().min(1, "Эмнэлэг сонгоно уу"),
});

const emptyForm: EquipmentForm = {
  name: "",
  serialNo: "",
  category: "",
  state: "",
  hospitalId: "",
};

export default function EquipmentModal({
  open,
  mode,
  initialData,
  hospitals,
  onClose,
  onSuccess,
}: EquipmentModalProps) {
  const [form, setForm] = useState<EquipmentForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [createEquipment, createState] = useMutation(EQUIPMENT_CREATE);
  const [updateEquipment, updateState] = useMutation(EQUIPMENT_UPDATE);

  const loading = createState.loading || updateState.loading;
  const error = createState.error || updateState.error;

  useEffect(() => {
    if (!open) return;
    if (mode === "update" && initialData) {
      setForm({
        name: initialData.name ?? "",
        serialNo: initialData.serialNo ?? "",
        category: (initialData.category ?? "") as EquipmentCategory | "",
        state: (initialData.state ?? "") as EquipmentState | "",
        hospitalId: initialData.hospital?.id ?? "",
      });
    } else {
      setForm((prev) => ({
        ...emptyForm,
        hospitalId: hospitals[0]?.id ?? prev.hospitalId ?? "",
      }));
    }
    setErrors({});
  }, [open, mode, initialData, hospitals]);

  const title = useMemo(
    () =>
      mode === "create" ? "Тоног төхөөрөмж нэмэх" : "Тоног төхөөрөмж засах",
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
      serialNo: form.serialNo,
      category: form.category as EquipmentCategory,
      state: form.state as EquipmentState,
      hospitalId: form.hospitalId,
    };

    if (mode === "create") {
      await createEquipment({ variables: { input } });
    } else if (initialData?.id) {
      await updateEquipment({
        variables: { equipmentUpdateId: initialData.id, input },
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
          label="Сериал дугаар"
          fullWidth
          margin="normal"
          value={form.serialNo}
          onChange={(e) => setForm({ ...form, serialNo: e.target.value })}
          error={!!errors.serialNo}
          helperText={errors.serialNo}
        />

        <TextField
          select
          label="Төрөл"
          fullWidth
          margin="normal"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value as EquipmentCategory,
            })
          }
          error={!!errors.category}
          helperText={errors.category}
        >
          {Object.values(EquipmentCategory).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Төлөв"
          fullWidth
          margin="normal"
          value={form.state}
          onChange={(e) =>
            setForm({ ...form, state: e.target.value as EquipmentState })
          }
          error={!!errors.state}
          helperText={errors.state}
        >
          {Object.values(EquipmentState).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Эмнэлэг"
          fullWidth
          margin="normal"
          value={form.hospitalId}
          onChange={(e) => setForm({ ...form, hospitalId: e.target.value })}
          error={!!errors.hospitalId}
          helperText={errors.hospitalId}
        >
          {hospitals.map((hospital) => (
            <MenuItem key={hospital.id} value={hospital.id ?? ""}>
              {hospital.name ?? hospital.id}
            </MenuItem>
          ))}
        </TextField>
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
