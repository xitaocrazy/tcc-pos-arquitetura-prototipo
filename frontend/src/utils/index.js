export const formatDate = dateString => {
  const date = dateString && new Date(dateString);
  const day =
    date &&
    date
      .getDate()
      .toString()
      .padStart(2, "0");
  const month = date && (date.getMonth() + 1).toString().padStart(2, "0");
  const hour =
    date &&
    date
      .getHours()
      .toString()
      .padStart(2, "0");
  const minute =
    date &&
    date
      .getMinutes()
      .toString()
      .padStart(2, "0");
  return `${day}/${month}/${date && date.getFullYear()} ${hour}:${minute}`;
};