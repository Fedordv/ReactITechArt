import type { WeatherResponse } from "@/api/weatherApi";

export function useWeatherDetails(data: WeatherResponse, unit: "metric" | "imperial") {
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const speedUnit = unit === "metric" ? "m/s" : "mph";

  const icon = data.weather[0]?.icon;

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { tempUnit, speedUnit, icon, sunrise, sunset };
}
