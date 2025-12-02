import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store, type RootState } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

function ThemedApp() {
  const theme = useSelector((state: RootState) => state.settings.theme);

  React.useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    root.classList.add(theme);
    body.classList.add(theme);
    
    console.log('Theme applied:', theme);
    
  }, [theme]);

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemedApp />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);