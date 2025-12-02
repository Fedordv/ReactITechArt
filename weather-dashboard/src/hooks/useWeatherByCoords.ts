import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCoords } from "../api/weatherApi";

export const useWeatherByCoords = (coords: { lat: number; lon: number } | null) => {
  return useQuery({
    queryKey: ["weather", coords],
    queryFn: () => {
      if (!coords) return null;
      return fetchWeatherByCoords(coords.lat, coords.lon);
    },
    enabled: !!coords,
  });
};
