import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/index';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import SavedLocationsPage from './pages/SavedLocationsPage';
import CurrentPage from './pages/CurrentWeatherPages/CurrentWeather';
import ForecastPage from './pages/CurrentWeatherPages/Forecast';
import NotFoundPage from './pages/NotFoundPage';
import { ROUTES } from './constants/routes';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path={ROUTES.CURRENT} element={<CurrentPage />} />
        <Route path={ROUTES.FORECAST} element={<ForecastPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACTS} element={<ContactsPage />} />
        <Route path={ROUTES.SAVED} element={<SavedLocationsPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
