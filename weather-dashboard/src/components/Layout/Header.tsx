import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import UnitToggle from '../UnitToggle';
import { NAV_LINKS } from '@/constants/navLinks';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);


  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:bg-slate-800/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <span className="text-lg font-semibold text-sky-600 dark:text-sky-400">
          🌤 WeatherDash
        </span>

        <nav className="hidden md:flex gap-4 text-sm font-medium">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `hover:text-sky-500 ${
                  isActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-700 dark:text-slate-200'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <UnitToggle />
          <ThemeToggle />

          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center gap-1 w-8 h-8 md:hidden"
          >
            <span
              className={`block h-0.5 w-6 bg-slate-900 dark:bg-white transition-transform ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-slate-900 dark:bg-white transition-opacity ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-slate-900 dark:bg-white transition-transform ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <nav
        className={`md:hidden bg-white/95 dark:bg-slate-800/95 overflow-hidden transition-all ${
          isOpen ? 'max-h-60' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-4 py-2 gap-2">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="text-slate-700 dark:text-slate-200 hover:text-sky-500"
            >
              {link.label}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
}
