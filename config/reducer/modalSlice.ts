import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
    isEditData: any;
}

const initialState: InitialState = {
    isEditData: null
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleEditModal: (state, action: PayloadAction<any>) => {
            state.isEditData = action.payload;
        }
    }
});

export const { toggleEditModal } = modalSlice.actions;
export const modal = (state: RootState) => state.modal;
export default modalSlice.reducer;