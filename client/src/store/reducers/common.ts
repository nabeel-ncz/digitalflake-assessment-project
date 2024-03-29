import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
    theme: string
}

const initialState: CommonState = {
    theme: "dark",
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
    },
})

export const { changeTheme } = commonSlice.actions;
export default commonSlice.reducer;