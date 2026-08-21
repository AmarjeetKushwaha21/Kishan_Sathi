import { createContext, useContext, useMemo, useState } from 'react';

import {
  CURRENT_WEATHER,
  HOURLY_FORECAST,
  RAIN_PREDICTION,
  WEATHER_ALERTS,
  WEATHER_CHARTS,
  WEEKLY_FORECAST,
  WEATHER_LOCATIONS,
} from '@/data/mock/weather';

const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
  const [unit, setUnit] = useState('c');
  const [activeLocationId, setActiveLocationId] = useState(WEATHER_LOCATIONS[0].id);

  const activeLocation = useMemo(
    () => WEATHER_LOCATIONS.find((loc) => loc.id === activeLocationId) || WEATHER_LOCATIONS[0],
    [activeLocationId]
  );

  const convert = useMemo(
    () => (celsius) => (unit === 'f' ? Math.round((celsius * 9) / 5 + 32) : celsius),
    [unit]
  );

  const value = useMemo(
    () => ({
      unit,
      setUnit,
      unitSymbol: unit === 'f' ? '°F' : '°C',
      convert,
      activeLocation,
      setActiveLocationId,
      current: CURRENT_WEATHER,
      hourly: HOURLY_FORECAST,
      weekly: WEEKLY_FORECAST,
      alerts: WEATHER_ALERTS,
      rain: RAIN_PREDICTION,
      charts: WEATHER_CHARTS,
    }),
    [unit, convert, activeLocation]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error('useWeather must be used within a WeatherProvider');
  return ctx;
}