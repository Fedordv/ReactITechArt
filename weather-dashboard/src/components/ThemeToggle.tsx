import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/redux/settingsSlice';
import type { RootState } from '@/redux/store';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.settings.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700 transition"
    >
      {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
}