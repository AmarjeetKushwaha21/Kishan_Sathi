import { PUBLIC_PAGES } from '@/data/publicPages';
import FeaturePage from '@/components/public/FeaturePage';

export default function WeatherPage() {
  return <FeaturePage page={PUBLIC_PAGES.weather} />;
}
