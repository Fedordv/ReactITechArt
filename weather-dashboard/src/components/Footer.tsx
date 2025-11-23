export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-3 text-center text-xs text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
      © {new Date().getFullYear()} WeatherDash · Built with React, React Query, Tailwind
    </footer>
  );
}
