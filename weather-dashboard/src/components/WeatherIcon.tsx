export default function WeatherIcon({ icon }: { icon: string }) {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      className="w-20 h-20"
      alt="weather icon"
    />
  );
}
