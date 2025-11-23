import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../redux/store';
import { setUnit } from '../redux/settingsSlice';

export default function UnitToggle() {
    const unit = useSelector((state: RootState) => state.settings.unit)
    const dispatch = useDispatch();

    return (

    <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => dispatch(setUnit('metric'))}
        className={`rounded-l-full border px-2 py-1 ${
          unit === 'metric'
            ? 'bg-sky-500 text-white'
            : 'border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-200'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => dispatch(setUnit('imperial'))}
        className={`rounded-r-full border px-2 py-1 ${
          unit === 'imperial'
            ? 'bg-sky-500 text-white'
            : 'border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-200'
        }`}
      >
        °F
      </button>
    </div>

    )
}