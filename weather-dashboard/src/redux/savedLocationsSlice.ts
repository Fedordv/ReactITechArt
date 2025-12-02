import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SavedLocationsState {
    cities: string[];
    selectedCity: string | null;
} 

const initialState: SavedLocationsState = {
    cities: JSON.parse(localStorage.getItem('savedCities') || '[]'),
    selectedCity: null
}

const savedLocationsSlice = createSlice({
    name: 'savedLocations',
    initialState,
    reducers: {
        addCity(state, action: PayloadAction<string>) {
            const city = action.payload.trim();
            if (city && !state.cities.includes(city)) {
                state.cities.push(city);
                localStorage.setItem('savedCities', JSON.stringify(state.cities));
            }
        },
        removeCity(state, action: PayloadAction<string>) {
            state.cities = state.cities.filter(c => c !== action.payload);
            localStorage.setItem('savedCities', JSON.stringify(state.cities));
            if (state.selectedCity === action.payload) {
                state.selectedCity = null;
            }
        },
        selectCity(state, action: PayloadAction<string>) {
            state.selectedCity = action.payload;
        }
    }
});

export const { addCity, removeCity, selectCity } = savedLocationsSlice.actions;
export default savedLocationsSlice.reducer;
