import { FiDroplet, FiRefreshCw, FiThermometer, FiUmbrella, FiWind } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { weatherIcon } from './dashboardIcons';
import { WEATHER } from '@/data/mock/dashboard';
import { cn } from '@/utils/cn';

const DETAILS = [
  { key: 'humidity', label: 'Humidity', value: `${WEATHER.current.humidity}%`, icon: FiDroplet },
  { key: 'wind', label: 'Wind', value: `${WEATHER.current.windSpeed} km/h ${WEATHER.current.windDir}`, icon: FiWind },
  { key: 'rain', label: 'Rain chance', value: `${WEATHER.current.rainProbability}%`, icon: FiUmbrella },
  { key: 'uv', label: 'UV Index', value: `${WEATHER.current.uvIndex} (High)`, icon: FiThermometer },
];

export default function WeatherCard() {
  const CurrentIcon = weatherIcon(WEATHER.current.conditionKey);

  return (
    <Card variant="soft" className="flex h-full flex-col">
      <SectionHeader title="Weather Today" subtitle={`Updated ${WEATHER.current.updatedAt}`} to="/dashboard/weather" linkLabel="Full forecast" />

      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-3xl text-white shadow-soft">
          <CurrentIcon aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold text-gray-900">{WEATHER.current.temp}°</span>
            <span className="text-sm text-gray-500">feels {WEATHER.current.feelsLike}°</span>
          </p>
          <p className="text-sm font-medium text-gray-600">{WEATHER.current.condition}</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2.5">
        {DETAILS.map(({ key, label, value, icon: Icon }) => (
          <div key={key} className="flex items-center gap-2.5 rounded-xl bg-primary-50/60 p-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm text-sky-600 shadow-soft">
              <Icon aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <dt className="truncate text-[10px] font-medium uppercase tracking-wide text-gray-500">{label}</dt>
              <dd className="truncate text-xs font-semibold text-gray-900">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-auto pt-4">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">5-day forecast</p>
        <ul className="flex justify-between gap-1 rounded-xl border border-gray-100 p-2">
          {WEATHER.forecast.map((day, index) => {
            const DayIcon = weatherIcon(day.conditionKey);
            return (
              <li
                key={day.day}
                className={cn(
                  'flex flex-1 flex-col items-center gap-1 rounded-lg px-1 py-2 text-center',
                  index === 0 && 'bg-primary-50'
                )}
              >
                <span className="text-[10px] font-semibold text-gray-500">{day.day}</span>
                <DayIcon className={cn('text-base', index === 0 ? 'text-sky-500' : 'text-gray-400')} aria-hidden="true" />
                <span className="text-xs font-bold text-gray-900">{day.temp}°</span>
                <span className="text-[10px] text-gray-400">{day.rain}%</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 flex items-center justify-end gap-1 text-[10px] text-gray-400">
          <FiRefreshCw aria-hidden="true" /> Refreshed automatically every 30 min
        </p>
      </div>
    </Card>
  );
}