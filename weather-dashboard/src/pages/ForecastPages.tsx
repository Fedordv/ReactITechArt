import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import WeatherIcon from "@/components/WeatherIcon";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useForecastByCoords } from "@/hooks/useForecastByCoords";
import { formatDate } from "@/utils/date";
import { getFiveDaysForecast } from "@/utils/forecast";

export default function Forecast() {
  const { coords, error: geoError, loading } = useGeolocation();
  const { data, isPending, error } = useForecastByCoords(coords);

  if (geoError) return <ErrorMessage message={geoError} />;
  if (loading || isPending) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Ошибка загрузки прогноза" />;
  if (!data || !data.list) return <ErrorMessage message="Данные недоступны" />;

  const fiveDays = getFiveDaysForecast(data.list);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Прогноз на 5 дней (текущая локация)
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {fiveDays.map(item => (
          <div
            key={item.dt}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center"
          >
            <p className="font-semibold mb-1">
              {formatDate(item.dt)}
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
