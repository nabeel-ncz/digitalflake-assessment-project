import { createSlice } from '@reduxjs/toolkit';
import { createProductAction, getProductsAction, updateProductAction } from '../actions/product';

interface ProductState {
    data: {
        _id: string;
        name: string;
        categoryRef: {
            _id: string;
            name: string;
            description: string;
        }
        description: string;
        status: string;
        size: string;
        price: string;
        image: string;
    }[] | null;
    error: string | null;
    loading: boolean;
}

const initialState: ProductState = {
    data: null,
    error: null,
    loading: false
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createProductAction.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(createProductAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProductAction.rejected, (state, action) => {
                state.error = action.error?.message ?? "Something went wrong!";
                state.loading = false;
            })
            .addCase(updateProductAction.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(updateProductAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductAction.rejected, (state, action) => {
                state.error = action.error?.message ?? "Something went wrong!";
                state.loading = false;
            })
            .addCase(getProductsAction.fulfilled, (state, action) => {
                state.data = action.payload?.data;
                state.loading = false;
            })
            .addCase(getProductsAction.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getProductsAction.pending, (state) => {
                state.loading = true;
            });
    }
})

export const { } = productSlice.actions;
export default productSlice.reducer;