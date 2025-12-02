import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../redux/store';
import { useWeather } from '../hooks/useWeather';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { addCity } from '../redux/savedLocationsSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function DashboardPage() {
  const selectedCity = useSelector((state: RootState) => state.savedLocations.selectedCity);
  const unit = useSelector((state: RootState) => state.settings.unit);
  const dispatch = useDispatch();

  const [city, setCity] = React.useState(selectedCity || 'Minsk');

  React.useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity);
    }
  }, [selectedCity]);

  const { data, isLoading, isError, error } = useWeather(city, unit);

  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };

  const handleSave = () => {
    if (data?.name) {
      dispatch(addCity(data.name));
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorMessage message={(error as Error).message} />}
      {data && (
        <div className="space-y-3">
          <WeatherCard data={data} unit={unit} />
          <button
            onClick={handleSave}
            className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600">
            Save location
          </button>
        </div>
      )}
    </div>
  );
}
