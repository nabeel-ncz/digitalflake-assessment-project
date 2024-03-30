import { createSlice } from '@reduxjs/toolkit';
import { signupAction } from '../actions/user';

interface UserState {
    data: {
        name: string;
        email: string;
    } | null;
    error: string | null;
    loading: boolean;
}

const initialState: UserState = {
    data: null,
    error: null,
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(signupAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signupAction.fulfilled, (state, action) => {
            state.data = action.payload?.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(signupAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message ?? "Something went wrong"
        })
    }
})

export const {  } = userSlice.actions;
export default userSlice.reducer;