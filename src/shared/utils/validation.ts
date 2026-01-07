export const isValidExpiry = (mmYY: string) => {
    const [mm, yy] = mmYY.split("/").map(Number);
    if (!mm || !yy) return false;

    if (mm < 1 || mm > 12) return false;

    const currentYear = Number(new Date().getFullYear().toString().slice(-2));
    return yy >= 22 && yy <= currentYear + 5;
};