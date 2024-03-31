import { createSlice } from '@reduxjs/toolkit';
import { createCategoryAction, getCategoriesAction } from '../actions/category';

interface CategoryState {
    data: {
        _id: string;
        name: string;
        description: string;
        status: string;
    }[] | null;
    error: string | null;
    loading: boolean;
}

const initialState: CategoryState = {
    data: null,
    error: null,
    loading: false
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategoryAction.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(createCategoryAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategoryAction.rejected, (state, action) => {
                state.error = action.error?.message ?? "Something went wrong!";
                state.loading = false;
            })
            .addCase(getCategoriesAction.fulfilled, (state, action) => {
                state.data = action.payload?.data;
                state.loading = false;
            })
            .addCase(getCategoriesAction.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getCategoriesAction.pending, (state) => {
                state.loading = true;
            });
    }
})

export const { } = categorySlice.actions;
export default categorySlice.reducer;