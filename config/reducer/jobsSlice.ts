import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
    jobs: Jobs[]
}

const initialState: InitialState = {
    jobs: []
}

export const jobsSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        addJobs: (state, action: PayloadAction<Jobs>): void => {
            state.jobs.push(action.payload);
        },
        editTodo: (state, action: PayloadAction<Jobs>): void => {
            state.jobs.find((job: Jobs) => {
                if (job.key === action.payload.key) {
                    job.name = action.payload.name;
                    job.tags = action.payload.tags;
                }
            });
        },
        deleteTodo: (state, action: PayloadAction<Jobs>): void => {
            state.jobs = state.jobs.filter(
                (job: Jobs) => job.key !== action.payload.key
            );
        }
    }
});

export const { addJobs, editTodo, deleteTodo } = jobsSlice.actions;
export const selectJobs = (state: RootState) => state.job;
export default jobsSlice.reducer;