import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export interface WeatherResponse {
  name: string;

  weather: {
    description: string;
    icon: string;
  }[];

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };

  wind: {
    speed: number;
    deg: number;
  };

  clouds: {
    all: number;
  };

  visibility: number;

  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export const fetchWeatherByCity = async (
  city: string,
  units: 'metric' | 'imperial'
) => {
  const res = await axios.get<WeatherResponse>(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units
    }
  });
  return res.data;
};
