import { type WeatherResponse } from '@/api/weatherApi';
import { useWeatherDetails } from '@/hooks/useWeatherDetails';

interface Props {
  data: WeatherResponse;
  unit: 'metric' | 'imperial';
}

export default function WeatherCard({ data, unit }: Props) {
  const { tempUnit, speedUnit, icon, sunrise, sunset } =
    useWeatherDetails(data, unit);

  return (
    <div className="rounded-2xl bg-white/80 p-6 shadow-md backdrop-blur dark:bg-slate-800/80 dark:text-slate-200">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{data.name}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">
            {data.weather[0]?.description}
          </p>
        </div>

        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
            className="h-16 w-16"
          />
        )}
      </div>

      {/* MAIN TEMPS */}
      <div className="mt-6 flex items-end gap-4">
        <span className="text-5xl font-bold">
          {Math.round(data.main.temp)}
          {tempUnit}
        </span>

        <span className="text-md text-slate-600 dark:text-slate-400">
          Feels like {Math.round(data.main.feels_like)}
          {tempUnit}
        </span>
      </div>

      {/* EXTRA TEMPS */}
      <div className="mt-2 flex gap-6 text-sm text-slate-600 dark:text-slate-400">
        <p>Min: {Math.round(data.main.temp_min)}{tempUnit}</p>
        <p>Max: {Math.round(data.main.temp_max)}{tempUnit}</p>
      </div>

      {/* GRID INFO */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700/40">
          <p className="text-xs text-slate-500">Humidity</p>
          <p className="font-semibold">{data.main.humidity}%</p>
        </div>

        <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700/40">
          <p className="text-xs text-slate-500">Pressure</p>
          <p className="font-semibold">{data.main.pressure} hPa</p>
        </div>

        <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700/40">
          <p className="text-xs text-slate-500">Wind</p>
          <p className="font-semibold">
            {data.wind.speed} {speedUnit}, {data.wind.deg}°
          </p>
        </div>

        <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700/40">
          <p className="text-xs text-slate-500">Clouds</p>
          <p className="font-semibold">{data.clouds.all}%</p>
        </div>

        <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700/40">
          <p className="text-xs text-slate-500">Visibility</p>
          <p className="font-semibold">{data.visibility / 1000} km</p>
        </div>

        <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700/40">
          <p className="text-xs text-slate-500">Wind Dir</p>
          <p className="font-semibold">{data.wind.deg}°</p>
        </div>
      </div>

      {/* SUN */}
      <div className="mt-6 flex items-center justify-between text-sm">
        <div>
          <p className="text-xs text-slate-500">Sunrise</p>
          <p className="font-semibold">{sunrise}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Sunset</p>
          <p className="font-semibold">{sunset}</p>
        </div>
      </div>

    </div>
  );
}
