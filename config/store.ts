import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import jobsReducer from './reducer/jobsSlice';
import modalReducer from './reducer/modalSlice';

export const store = configureStore({
    reducer: {
        job: jobsReducer,
        modal: modalReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;