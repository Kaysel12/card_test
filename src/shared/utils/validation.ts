export const isValidExpiry = (expiry: string): boolean => {
  if (!expiry?.includes("/")) return false;

  const parts = expiry.split("/");
  if (parts.length !== 2) return false;

  const mm = Number(parts[0]);
  const yy = Number(parts[1]);

  if (Number.isNaN(mm) || Number.isNaN(yy)) return false;

  if (mm < 1 || mm > 12) return false;

  const now = new Date();
  const currentYY = Number(now.getFullYear().toString().slice(-2));
  const currentMM = now.getMonth() + 1;

  if (yy < currentYY || (yy === currentYY && mm < currentMM)) return false;

  if (yy > currentYY + 5) return false;

  return true;
};
