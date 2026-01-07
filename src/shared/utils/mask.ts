export const maskCardNumber = (value: string) =>
  value.replaceAll(/\D/g, "").slice(0, 16).replaceAll(/(\d{4})(?=\d)/g, "$1 ").trim();

export const maskExpiry = (value: string) => {
  const v = value.replaceAll(/\D/g, "").slice(0, 4);
  return v.length >= 3 ? v.replaceAll(/(\d{2})(\d{1,2})/, "$1/$2") : v;
};

export const maskName = (value: string) =>
  value
    .toUpperCase()
    .replaceAll(/[^A-ZÁÉÍÓÚÑ\s]/gi, "")
    .slice(0, 20);

export const maskCardForDisplay = (cardNumber: string) => {
  const digits = cardNumber.replace(/\D/g, "");

  if (digits.length < 6) return digits; // por si está incompleta

  const first = digits.slice(0, 2);
  const last = digits.slice(-4);

  return `${first}********${last}`;
};