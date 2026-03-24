import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useWeather } from "../hooks/useWeather";
import { fetchWeatherByCity } from "../api/weatherApi";

vi.mock("../api/weatherApi", () => ({
  fetchWeatherByCity: vi.fn()
}));

const wrapper = ({ children }: any) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe("useWeather hook", () => {
  it("загружает данные о погоде успешно", async () => {
    const mockData = {
      name: "Berlin",
      weather: [{ description: "clear sky", icon: "01d" }],
      main: {
        temp: 20,
        feels_like: 19,
        temp_min: 15,
        temp_max: 22,
        pressure: 1015,
        humidity: 50
      },
      wind: { speed: 3, deg: 100 },
      clouds: { all: 10 },
      visibility: 9000,
      sys: { country: "DE", sunrise: 123, sunset: 456 }
    };

    (fetchWeatherByCity as any).mockResolvedValue(mockData);

    const { result } = renderHook(
      () => useWeather("Berlin", "metric"),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.name).toBe("Berlin");
    expect(fetchWeatherByCity).toHaveBeenCalledWith("Berlin", "metric");
  });
});
