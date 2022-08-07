import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveState } from '../../localStorage';

interface InitialState {
    jobs: Jobs[],
    search: Jobs[]
}

const initialState: InitialState = {
    jobs: [],
    search: []
}

export const jobsSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        addJobs: (state, action: PayloadAction<Jobs>): void => {
            state.jobs.push(action.payload);
            state.search.push(action.payload);
            saveState(state.search);
        },
        editTodo: (state, action: PayloadAction<Jobs>): void => {
            state.jobs.find((job: Jobs) => { if (job.key === action.payload.key) job.tags = action.payload.tags });
            state.search.find((job: Jobs) => { if (job.key === action.payload.key) job.tags = action.payload.tags });
            saveState(state.search);
        },
        initJobs: (state, action: PayloadAction<Jobs[]>): void => {
            state.jobs = action.payload;
            state.search = action.payload;
        },
        setJobs: (state, action: PayloadAction<Jobs[]>): void => {
            state.jobs = action.payload;
            saveState(state.search);
        },
        deleteTodo: (state, action: PayloadAction<Jobs>): void => {
            state.jobs = state.jobs.filter((job: Jobs) => job.key !== action.payload.key);
            state.search = state.search.filter((job: Jobs) => job.key !== action.payload.key);
            saveState(state.search);
        }
    }
});

export const { initJobs, setJobs, addJobs, editTodo, deleteTodo } = jobsSlice.actions;
export default jobsSlice.reducer;