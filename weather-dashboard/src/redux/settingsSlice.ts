import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Unit = 'metric' | 'imperial';
type Theme = 'light' | 'dark';

interface SettingsState {
  unit: Unit;
  theme: Theme;
}

const savedTheme = (localStorage.getItem('theme') as Theme) || null;
const systemTheme: Theme =
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const initialState: SettingsState = {
  unit: (localStorage.getItem('unit') as Unit) || 'metric',
  theme: savedTheme || systemTheme,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUnit(state, action: PayloadAction<Unit>) {
      state.unit = action.payload;
      localStorage.setItem('unit', state.unit);
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { setUnit, toggleTheme } = settingsSlice.actions;
export default settingsSlice.reducer;