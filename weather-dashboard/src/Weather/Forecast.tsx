import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import WeatherIcon from "../UI/WeatherIcon";

export default function Forecast() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Геолокация не поддерживается вашим браузером");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => setGeoError("Невозможно определить текущее местоположение")
    );
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["forecast", coords],
    queryFn: async () => {
      if (!coords) return null;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${
          import.meta.env.VITE_OPENWEATHER_KEY
        }`
      );

      if (!res.ok) throw new Error("Ошибка загрузки прогноза");

      return res.json();
    },
    enabled: !!coords,
  });

  if (geoError) return <ErrorMessage message={geoError} />;
  if (isLoading || !coords) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Ошибка загрузки прогноза" />;
  if (!data || !data.list) return <ErrorMessage message="Данные недоступны" />;

  const daily = data.list.filter((item: any) =>
    item.dt_txt.includes("12:00:00")
  );

  const fiveDays = daily.slice(0, 5);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Прогноз на 5 дней (текущая локация)
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {fiveDays.map((item: any) => (
          <div
            key={item.dt}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center"
          >
            <p className="font-semibold mb-1">
              {new Date(item.dt * 1000).toLocaleDateString("ru-RU", {
                weekday: "long",
                day: "numeric",
                month: "short",
              })}
            </p>

            <WeatherIcon icon={item.weather[0].icon} />

            <p className="text-2xl font-bold mt-2">
              {Math.round(item.main.temp)}°C
            </p>

            <p className="text-sm text-gray-500 capitalize">
              {item.weather[0].description}
            </p>

            <div className="mt-2 text-xs text-gray-400">
              💨 Ветер: {Math.round(item.wind.speed)} м/с<br />
              💧 Влажность: {item.main.humidity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
