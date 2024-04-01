import { createSlice } from '@reduxjs/toolkit';
import { getUserAction, loginAction, requestResetPasswordAction, signupAction } from '../actions/user';
import { logoutAction } from '../actions/user/logoutAction';

interface UserState {
    data: {
        _id: string;
        name: string;
        email: string;
    } | null;
    error: string | null;
    loading: boolean;
}

const initialState: UserState = {
    data: null,
    error: null,
    loading: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserAction.fulfilled, (state, action) => {
            state.data = action.payload?.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(getUserAction.rejected, (state) => {
            state.loading = false;
        })
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
        .addCase(loginAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginAction.fulfilled, (state, action) => {
            state.data = action.payload?.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(loginAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message ?? "Something went wrong"
        })
        .addCase(logoutAction.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        })
        .addCase(requestResetPasswordAction.pending, (state) => {
            state.error = null;
        })
        .addCase(requestResetPasswordAction.fulfilled, (state) => {
            state.error = null;
        })
        .addCase(requestResetPasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message ?? "Something went wrong"
        })
    }
})

export const { clearError } = userSlice.actions;
export default userSlice.reducer;