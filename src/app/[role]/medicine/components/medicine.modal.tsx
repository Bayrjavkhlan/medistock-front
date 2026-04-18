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
  DRUG_CREATE,
  DRUG_UPDATE,
} from "@/features/medicine/graphql/mutation.gql";
import type { Drug } from "@/generated/graphql";
import { getApolloErrorMessage } from "@/utils/getApolloErrorMessage";

type MedicineForm = {
  name: string;
  genericName: string;
  dosageForm: string;
  strength: string;
  manufacturer: string;
  description: string;
};

type MedicineModalProps = {
  open: boolean;
  mode: "create" | "update";
  initialData?: Drug | null;
  onClose: () => void;
  onSuccess: () => void;
};

const schema = z.object({
  name: z.string().min(1, "Эмийн нэр шаардлагатай"),
  genericName: z.string().optional(),
  dosageForm: z.string().optional(),
  strength: z.string().optional(),
  manufacturer: z.string().optional(),
  description: z.string().optional(),
});

const emptyForm: MedicineForm = {
  name: "",
  genericName: "",
  dosageForm: "",
  strength: "",
  manufacturer: "",
  description: "",
};

export default function MedicineModal({
  open,
  mode,
  initialData,
  onClose,
  onSuccess,
}: MedicineModalProps) {
  const [form, setForm] = useState<MedicineForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [createDrug, createState] = useMutation(DRUG_CREATE);
  const [updateDrug, updateState] = useMutation(DRUG_UPDATE);

  const loading = createState.loading || updateState.loading;

  useEffect(() => {
    if (!open) return;

    if (mode === "update" && initialData) {
      setForm({
        name: initialData.name ?? "",
        genericName: initialData.genericName ?? "",
        dosageForm: initialData.dosageForm ?? "",
        strength: initialData.strength ?? "",
        manufacturer: initialData.manufacturer ?? "",
        description: initialData.description ?? "",
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
    setSubmitError(null);
  }, [initialData, mode, open]);

  const title = useMemo(
    () => (mode === "create" ? "Шинэ эм нэмэх" : "Эмийн мэдээлэл засах"),
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

    setSubmitError(null);

    const input = {
      name: form.name.trim(),
      genericName: form.genericName.trim() || undefined,
      dosageForm: form.dosageForm.trim() || undefined,
      strength: form.strength.trim() || undefined,
      manufacturer: form.manufacturer.trim() || undefined,
      description: form.description.trim() || undefined,
    };

    try {
      if (mode === "create") {
        await createDrug({ variables: { input } });
      } else if (initialData?.id) {
        await updateDrug({
          variables: {
            drugUpdateId: initialData.id,
            input,
          },
        });
      }

      onSuccess();
    } catch (error) {
      setSubmitError(
        getApolloErrorMessage(
          error,
          "Эмийн мэдээллийг хадгалах үед алдаа гарлаа.",
        ),
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {submitError ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        ) : null}

        <TextField
          label="Эмийн нэр"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Ерөнхий нэр"
          fullWidth
          margin="normal"
          value={form.genericName}
          onChange={(event) =>
            setForm({ ...form, genericName: event.target.value })
          }
          error={!!errors.genericName}
          helperText={errors.genericName}
        />

        <TextField
          label="Хэлбэр"
          fullWidth
          margin="normal"
          value={form.dosageForm}
          onChange={(event) =>
            setForm({ ...form, dosageForm: event.target.value })
          }
          error={!!errors.dosageForm}
          helperText={errors.dosageForm}
        />

        <TextField
          label="Тун / хүч"
          fullWidth
          margin="normal"
          value={form.strength}
          onChange={(event) =>
            setForm({ ...form, strength: event.target.value })
          }
          error={!!errors.strength}
          helperText={errors.strength}
        />

        <TextField
          label="Үйлдвэрлэгч"
          fullWidth
          margin="normal"
          value={form.manufacturer}
          onChange={(event) =>
            setForm({ ...form, manufacturer: event.target.value })
          }
          error={!!errors.manufacturer}
          helperText={errors.manufacturer}
        />

        <TextField
          label="Тайлбар"
          fullWidth
          margin="normal"
          multiline
          minRows={4}
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
          error={!!errors.description}
          helperText={errors.description}
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
