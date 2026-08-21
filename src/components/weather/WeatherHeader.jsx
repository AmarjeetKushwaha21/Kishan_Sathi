import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin } from 'react-icons/fi';

import { useWeather } from '@/context/WeatherContext';
import { cn } from '@/utils/cn';

export default function WeatherHeader({ title, subtitle, showBack = false }) {
  const { unit, setUnit, activeLocation } = useWeather();
  const navigate = useNavigate();

  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      {showBack && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg text-gray-600 transition hover:text-primary-600"
        >
          <FiArrowLeft aria-hidden="true" />
        </button>
      )}

      <div className="min-w-0 flex-1">
        <h2 className="truncate font-display text-lg font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="truncate text-xs text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 shadow-soft">
          <FiMapPin className="text-sky-500" aria-hidden="true" />
          {activeLocation.name}, {activeLocation.district}
        </span>

        <div
          role="group"
          aria-label="Temperature unit"
          className="flex items-center rounded-xl border border-gray-200 bg-white p-1 shadow-soft"
        >
          {['c', 'f'].map((u) => (
            <button
              key={u}
              type="button"
              aria-pressed={unit === u}
              onClick={() => setUnit(u)}
              className={cn(
                'focus-ring rounded-lg px-2.5 py-1 text-xs font-bold transition',
                unit === u ? 'bg-sky-500 text-white' : 'text-gray-500 hover:text-sky-600'
              )}
            >
              °{u.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}