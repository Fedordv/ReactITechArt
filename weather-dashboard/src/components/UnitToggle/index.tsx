import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@/redux/store';
import { setUnit } from '@/redux/settingsSlice';
import UnitToggleItem from './UnitToggleItem';

export default function UnitToggle() {
    const unit = useSelector((state: RootState) => state.settings.unit)
    const dispatch = useDispatch();

    return (
    <div className="flex items-center gap-1 text-xs">
      <UnitToggleItem
        unit="°C"
        active={unit === 'metric'}
        onClick={() => dispatch(setUnit('metric'))}
      />

      <UnitToggleItem
        unit="°F"
        active={unit === 'imperial'}
        onClick={() => dispatch(setUnit('imperial'))}
      />
    </div>
  )
}