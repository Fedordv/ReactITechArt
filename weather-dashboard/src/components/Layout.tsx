import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export default function Layout() {
  const theme = useSelector((state: RootState) => state.settings.theme);
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-950 text-slate-50' 
        : 'bg-slate-100 text-slate-900'
    }`}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}