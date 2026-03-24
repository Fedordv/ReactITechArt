import { useQuery } from "@tanstack/react-query";
import { fetchForecastByCoords } from "@/api/weatherApi";

export const useForecastByCoords = (coords: { lat: number; lon: number } | null) => {
  return useQuery({
    queryKey: ["forecast", coords],
    queryFn: () => {
      if (!coords) return null;
      return fetchForecastByCoords(coords.lat, coords.lon);
    },
    enabled: !!coords,
  });
};
