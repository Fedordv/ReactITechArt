import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import DashboardPage from '../pages/DashboardPage';

vi.mock('../hooks/useWeather', () => ({
  useWeather: () => ({
    data: null,
    isLoading: false,
    isError: false,
    error: null,
  })
}));

const fakeStore = configureStore({
  reducer: {
    settings: () => ({ unit: 'metric' }),
    savedLocations: () => ({ cities: [] }),
  },
});

describe('DashboardPage', () => {
  it('renders title', () => {
    render(
      <Provider store={fakeStore}>
        <DashboardPage />
      </Provider>
    );

    expect(
      screen.getByText(/weather dashboard/i)
    ).toBeInTheDocument();
  });
});
