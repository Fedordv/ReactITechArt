import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import WeatherIcon from "../UI/WeatherIcon";

export default function CurrentLocationWeather() {
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
      () => {
        setGeoError("Невозможно определить текущее местоположение");
      }
    );
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["weather", "current-location", coords],
    queryFn: async () => {
      if (!coords) return null;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`
      );
      if (!res.ok) throw new Error("Ошибка загрузки данных");
      return res.json();
    },
    enabled: !!coords,
  });

  if (geoError) return <ErrorMessage message={geoError} />;
  if (isLoading || !coords) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Ошибка загрузки" />;

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow rounded p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Текущее местоположение</h2>

      <div className="flex flex-col items-center">
        {data.weather[0]?.icon && <WeatherIcon icon={data.weather[0].icon} />}
        <p className="text-xl">
          Температура: <b>{data.main.temp}°C</b>
        </p>
        <p>Влажность: {data.main.humidity}%</p>
        <p>Ветер: {data.wind.speed} м/c</p>
        <p className="mt-2 font-semibold">{data.name}</p>
      </div>
    </div>
  );
}
