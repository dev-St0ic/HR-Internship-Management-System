export const getTodayISO = () => {
  return new Date().toISOString.split("T")[0];
};

export const formatDateForDisplay = (dateStr) => {
  if (!dateStr) return "-";

  try {
    const date = new Date(dateStr);

    if (isNaN(date)) return "-";

    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${year}-${day}-${month}`; //YYYY-DD-MM display
  } catch {
    return "-";
  }
};
