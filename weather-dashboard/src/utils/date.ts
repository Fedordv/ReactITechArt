export const formatDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
