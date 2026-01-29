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
import { useState } from "react";

import { USER_CREATE } from "@/features/staff/graphql/mutations.gql";
import { OrganizationRole } from "@/generated/graphql";

interface CreateStaffModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  activeOrgId: string | null;
}

const ROLES = [
  { value: OrganizationRole.Owner, label: "Owner" },
  { value: OrganizationRole.Manager, label: "Manager" },
  { value: OrganizationRole.Staff, label: "Staff" },
];

export default function CreateStaffModal({
  open,
  onClose,
  onSuccess,
  activeOrgId,
}: CreateStaffModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "" as OrganizationRole,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [createUser, { loading, error }] = useMutation(USER_CREATE, {
    onCompleted: () => {
      onSuccess();
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "" as OrganizationRole,
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
    if (!form.password) newErrors.password = "Нууц үг шаардлагатай";
    if (!form.role) newErrors.role = "Үүрэг сонгоно уу";
    if (!activeOrgId) newErrors.organizationId = "Байгууллага сонгоно уу";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    createUser({
      variables: {
        input: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: form.role,
          organizationId: activeOrgId,
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
          label="Нууц үг"
          fullWidth
          margin="normal"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={!!errors.password}
          helperText={errors.password}
        />

        <TextField
          select
          label="Үүрэг"
          fullWidth
          margin="normal"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value as OrganizationRole })
          }
          error={!!errors.role}
          helperText={errors.role}
        >
          {ROLES.map((role) => (
            <MenuItem key={role.value} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </TextField>
        {!activeOrgId && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Үргэлжлүүлэхийн өмнө байгууллага сонгоно уу.
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Болих</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !activeOrgId}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Хадгалах
        </Button>
      </DialogActions>
    </Dialog>
  );
}
