import { useState, useEffect } from "react";

interface Coords {
  lat: number;
  lon: number;
}

export const useGeolocation = () => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Геолокация не поддерживается вашим браузером");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError("Невозможно определить текущее местоположение");
        setLoading(false);
      }
    );
  }, []);

  return { coords, loading, error };
};
