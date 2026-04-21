export const formatAddress = (parts: Array<string | null | undefined>) =>
  parts.filter(Boolean).join(", ");

export const formatDateTime = (value?: unknown) => {
  if (!value) return "Бүртгэгдээгүй";

  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return "Бүртгэгдээгүй";

  return new Intl.DateTimeFormat("mn-MN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatPrice = (value?: number | null) => {
  if (value == null) return "Бүртгэгдээгүй";

  return new Intl.NumberFormat("mn-MN", {
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatNullable = (value?: string | null) =>
  value && value.trim() ? value : "Бүртгэгдээгүй";
