import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@/redux/store';
import { removeCity, selectCity } from '@/redux/savedLocationsSlice';
import { useNavigate } from 'react-router-dom';

export default function SavedLocationsPage() {
  const cities = useSelector((state: RootState) => state.savedLocations.cities);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCityClick = (city: string) => {
    dispatch(selectCity(city));   
    navigate('/');       
  };

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Saved locations</h1>
      {cities.length === 0 && <p>No saved locations yet.</p>}
      <ul className="space-y-2">
        {cities.map((city) => (
          <li
            key={city}
            className="flex items-center justify-between rounded-md bg-white/80 px-3 py-2 text-sm shadow dark:bg-slate-800/80">
            <span
              onClick={() => handleCityClick(city)}
              className="cursor-pointer hover:underline">
              {city}
            </span>
            <button
              onClick={() => dispatch(removeCity(city))}
              className="text-xs text-red-500 hover:underline">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
