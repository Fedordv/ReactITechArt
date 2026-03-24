import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchWeatherByCity } from '../api/weatherApi';

vi.mock('axios');
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe('fetchWeatherByCity API', () => {
  it('успешно получает данные о погоде', async () => {
    const mockResponse = {
      name: 'London',
      weather: [{ description: 'clear sky', icon: '01d' }],
      main: {
        temp: 15,
        feels_like: 13,
        temp_min: 10,
        temp_max: 18,
        pressure: 1012,
        humidity: 60
      },
      wind: { speed: 3.5, deg: 200 },
      clouds: { all: 5 },
      visibility: 10000,
      sys: { country: 'GB', sunrise: 1234567, sunset: 7654321 }
    };

    mockedAxios.get = vi.fn().mockResolvedValue({ data: mockResponse });

    const result = await fetchWeatherByCity('London', 'metric');

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.name).toBe('London');
    expect(result.main.temp).toBe(15);
    expect(result.weather[0].icon).toBe('01d');
  });
});
