import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import savedLocationsReducer from './savedLocationsSlice';


export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        savedLocations: savedLocationsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;