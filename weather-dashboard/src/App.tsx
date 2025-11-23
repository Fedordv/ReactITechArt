import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import SavedLocationsPage from './pages/SavedLocationsPage';
import CurrentPage from './Weather/CurrentWeather';
import ForecastPage from './Weather/Forecast';
import NotFoundPage from './NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/current" element={<CurrentPage />} />
        <Route path="/forecast" element={<ForecastPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/saved" element={<SavedLocationsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
