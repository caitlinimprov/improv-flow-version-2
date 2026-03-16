import { useState, useEffect, useCallback } from "react";
import type { City } from "@/data/events";
import { AVAILABLE_CITIES } from "@/data/events";

const STORAGE_KEY = "impro-selected-cities";

export function useLocationPreferences() {
  const [selectedCities, setSelectedCities] = useState<City[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [detectingLocation, setDetectingLocation] = useState(false);
  const [detectedCity, setDetectedCity] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCities));
  }, [selectedCities]);

  const toggleCity = useCallback((city: City) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  }, []);

  const detectLocation = useCallback(async () => {
    if (!navigator.geolocation) return;
    setDetectingLocation(true);
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
      );
      // Reverse geocode with a free API
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
      );
      const data = await res.json();
      const cityName = data.city || data.locality || data.principalSubdivision;
      setDetectedCity(cityName);

      // Try to match to an available city
      const match = AVAILABLE_CITIES.find(
        (c) => cityName?.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(cityName?.toLowerCase())
      );
      if (match && !selectedCities.includes(match)) {
        setSelectedCities((prev) => [...prev, match]);
      }
    } catch (err) {
      console.error("Location detection failed:", err);
    } finally {
      setDetectingLocation(false);
    }
  }, [selectedCities]);

  return { selectedCities, toggleCity, detectLocation, detectingLocation, detectedCity };
}
