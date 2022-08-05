import { Action, AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { saveState } from '../localStorage';
import jobsReducer from './reducer/jobsSlice';
import modalReducer from './reducer/modalSlice';

const combinedReducer = combineReducers({
    job: jobsReducer,
    modal: modalReducer
});

export const store = configureStore({
    reducer: (state: any, action: AnyAction) => {
        if (action.type === HYDRATE) {
            const nextState = {
                ...state,
                ...action.payload
            };
            return nextState;
        } else {
            return combinedReducer(state, action);
        }
    }
});

const makeStore = () => store;
store.subscribe(() => { saveState(store.getState()?.job?.jobs) });

export const wrapper = createWrapper(makeStore);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;