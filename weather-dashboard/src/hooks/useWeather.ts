import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity } from '../api/weatherApi';

export const useWeather = (city: string, unit: 'metric' | 'imperial') => {
    return useQuery ({
        queryKey: ['weather', city, unit],
        queryFn: () => fetchWeatherByCity(city, unit),
        enabled: !!city
    })
};