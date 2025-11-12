"use client";
import { useMutation } from "@apollo/client";
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
import { useState } from "react";

import { STAFF_CREATE } from "@/features/user/graphql/mutations.gql";
import { EnumUserRole } from "@/generated/graphql";

interface CreateStaffModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ROLES = [
  { value: EnumUserRole.ADMIN, label: "Системийн админ" },
  { value: EnumUserRole.HOSPITAL_ADMIN, label: "Эмнэлэгийн админ" },
  { value: EnumUserRole.STAFF, label: "Ажилтан" },
];

const HOSPITALS = [
  { id: "hosp-1", name: "Central Hospital" },
  { id: "hosp-2", name: "Northside Medical Center" },
];

export default function CreateStaffModal({
  open,
  onClose,
  onSuccess,
}: CreateStaffModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    roleKeys: "" as EnumUserRole,
    hospitalId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [createStaff, { loading, error }] = useMutation(STAFF_CREATE, {
    onCompleted: () => {
      onSuccess();
      setForm({
        name: "",
        email: "",
        phone: "",
        roleKeys: "" as EnumUserRole,
        hospitalId: "",
      });
    },
    onError: (err) => {
      console.error("Create error:", err);
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "Нэр шаардлагатай";
    if (!form.email) newErrors.email = "Имэйл шаардлагатай";
    if (!form.phone) newErrors.phone = "Утас шаардлагатай";
    if (!form.roleKeys) newErrors.roleKeys = "Үүрэг сонгоно уу";
    if (form.roleKeys !== EnumUserRole.ADMIN && !form.hospitalId) {
      newErrors.hospitalId = "Эмнэлэг сонгоно уу";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    createStaff({
      variables: {
        input: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          roleKeys: form.roleKeys,
          hospitalId:
            form.roleKeys === EnumUserRole.ADMIN ? null : form.hospitalId,
        },
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Шинэ ажилтан нэмэх</DialogTitle>
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
          select
          label="Үүрэг"
          fullWidth
          margin="normal"
          value={form.roleKeys}
          onChange={(e) =>
            setForm({ ...form, roleKeys: e.target.value as EnumUserRole })
          }
          error={!!errors.roleKeys}
          helperText={errors.roleKeys}
        >
          {ROLES.map((role) => (
            <MenuItem key={role.value} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </TextField>

        {form.roleKeys !== EnumUserRole.ADMIN && (
          <TextField
            select
            label="Эмнэлэг"
            fullWidth
            margin="normal"
            value={form.hospitalId}
            onChange={(e) => setForm({ ...form, hospitalId: e.target.value })}
            error={!!errors.hospitalId}
            helperText={
              errors.hospitalId || "Системийн админд эмнэлэг хэрэггүй"
            }
          >
            {HOSPITALS.map((h) => (
              <MenuItem key={h.id} value={h.id}>
                {h.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Болих</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Хадгалах
        </Button>
      </DialogActions>
    </Dialog>
  );
}
