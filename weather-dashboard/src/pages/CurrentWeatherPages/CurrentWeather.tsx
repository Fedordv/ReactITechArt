import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import WeatherIcon from "../../components/WeatherIcon";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useWeatherByCoords } from "../../hooks/useWeatherByCoords";

export default function CurrentLocationWeather() {
  const { coords, error: geoError, loading } = useGeolocation();
  const { data, isLoading, error } = useWeatherByCoords(coords);

  if (geoError) return <ErrorMessage message={geoError} />;
  if (loading || isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Ошибка загрузки" />;
  if (!data) return null;

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
