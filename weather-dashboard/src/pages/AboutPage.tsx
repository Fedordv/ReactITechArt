export default function AboutPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">About this app</h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        WeatherDash is a demo weather dashboard built with React, React Router,
        React Query, Redux Toolkit, TailwindCSS and OpenWeather API.
      </p>
      <ul className="list-disc pl-5 text-sm">
        <li>Search weather by city</li>
        <li>Switch temperature units (°C / °F)</li>
        <li>Save favorite locations</li>
        <li>Light/Dark themes</li>
      </ul>
    </div>
  );
}
