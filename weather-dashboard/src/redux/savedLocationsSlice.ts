import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'

interface SavedLocationsState {
    cities: string[];
} 

const initialState: SavedLocationsState = {
    cities: JSON.parse(localStorage.getItem('savedCities') || '[]')
}

const savedLocationsSlice = createSlice ({
    name: 'savedLocations',
    initialState,
    reducers: {
        addCity(state, action: PayloadAction<string>) {
            const city = action.payload.trim();
            if (city && !state.cities.includes(city)) {
                state.cities.push(city);
                localStorage.setItem('savedCities', JSON.stringify(state.cities))
            }
        },
        removeCity(state, action: PayloadAction<string>) {
            state.cities = state.cities.filter((c) => c !== action.payload)
            localStorage.setItem('savedCities', JSON.stringify(state.cities))
        }

    }
});

export const {addCity, removeCity} = savedLocationsSlice.actions;
export default savedLocationsSlice.reducer;