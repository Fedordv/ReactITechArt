import axios from "axios";
import { BASE_URL, API_KEY } from "../constants/api";

export interface WeatherResponse {
  name: string;
  weather: { description: string; icon: string }[];
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

export interface ForecastResponse {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: { description: string; icon: string }[];
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt_txt: string;
  }[];
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const res = await axios.get<WeatherResponse>(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });
  return res.data;
};

export const fetchForecastByCoords = async (lat: number, lon: number) => {
  const res = await axios.get<ForecastResponse>(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });
  return res.data;
};

export const fetchWeatherByCity = async (city: string, units: 'metric' | 'imperial' = 'metric') => {
  const res = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, appid: API_KEY, units }
  });
  return res.data;
};