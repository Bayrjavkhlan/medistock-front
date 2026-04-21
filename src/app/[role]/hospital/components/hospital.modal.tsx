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
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import type { LatLng } from "@/features/explore/types";
import {
  HOSPITAL_CREATE,
  HOSPITAL_UPDATE,
} from "@/features/hospital/graphql/mutation.gql";
import type { Hospital } from "@/generated/graphql";

const LocationPickerMap = dynamic(
  () => import("@/components/maps/location-picker.map"),
  { ssr: false },
);

type HospitalForm = {
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  province: string;
  latitude: string;
  longitude: string;
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
  latitude: "",
  longitude: "",
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
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState<LatLng | null>(null);

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
        latitude:
          initialData.address &&
          "latitude" in initialData.address &&
          initialData.address.latitude !== null &&
          initialData.address.latitude !== undefined
            ? String(initialData.address.latitude)
            : "",
        longitude:
          initialData.address &&
          "longitude" in initialData.address &&
          initialData.address.longitude !== null &&
          initialData.address.longitude !== undefined
            ? String(initialData.address.longitude)
            : "",
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

  const parseCoordinate = (value: string): number | null => {
    if (!value.trim()) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : NaN;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const latitude = parseCoordinate(form.latitude);
    const longitude = parseCoordinate(form.longitude);

    const nextErrors: Record<string, string> = {};
    if (Number.isNaN(latitude))
      nextErrors.latitude = "Latitude must be a number";
    if (Number.isNaN(longitude))
      nextErrors.longitude = "Longitude must be a number";
    if ((latitude === null) !== (longitude === null)) {
      nextErrors.latitude = "Provide both latitude and longitude";
      nextErrors.longitude = "Provide both latitude and longitude";
    }
    if (
      latitude !== null &&
      latitude !== undefined &&
      !Number.isNaN(latitude)
    ) {
      if (latitude < -90 || latitude > 90) {
        nextErrors.latitude = "Latitude must be between -90 and 90";
      }
    }
    if (
      longitude !== null &&
      longitude !== undefined &&
      !Number.isNaN(longitude)
    ) {
      if (longitude < -180 || longitude > 180) {
        nextErrors.longitude = "Longitude must be between -180 and 180";
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...nextErrors }));
      return;
    }

    const input = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: {
        address1: form.address1,
        address2: form.address2 || undefined,
        province: form.province,
        latitude: latitude ?? undefined,
        longitude: longitude ?? undefined,
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
        <TextField
          label="Latitude"
          fullWidth
          margin="normal"
          value={form.latitude}
          onChange={(e) => setForm({ ...form, latitude: e.target.value })}
          error={!!errors.latitude}
          helperText={errors.latitude}
        />
        <TextField
          label="Longitude"
          fullWidth
          margin="normal"
          value={form.longitude}
          onChange={(e) => setForm({ ...form, longitude: e.target.value })}
          error={!!errors.longitude}
          helperText={errors.longitude}
        />
        <DialogActions sx={{ px: 0 }}>
          <Button
            onClick={() => {
              const currentLat = parseCoordinate(form.latitude);
              const currentLng = parseCoordinate(form.longitude);
              if (
                currentLat !== null &&
                currentLng !== null &&
                !Number.isNaN(currentLat) &&
                !Number.isNaN(currentLng)
              ) {
                setPickerValue({ latitude: currentLat, longitude: currentLng });
              } else {
                setPickerValue(null);
              }
              setPickerOpen(true);
            }}
          >
            Pick on map
          </Button>
          <Button
            color="inherit"
            onClick={() => setForm({ ...form, latitude: "", longitude: "" })}
          >
            Clear coordinates
          </Button>
        </DialogActions>
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

      <Dialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Pick hospital location</DialogTitle>
        <DialogContent dividers>
          <LocationPickerMap value={pickerValue} onChange={setPickerValue} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPickerOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (pickerValue) {
                setForm({
                  ...form,
                  latitude: pickerValue.latitude.toFixed(6),
                  longitude: pickerValue.longitude.toFixed(6),
                });
              }
              setPickerOpen(false);
            }}
          >
            Use selected point
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
