import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./reducers/common";
import userReducer from "./reducers/user";
import categoryReducer from "./reducers/category";
import productReducer from "./reducers/product";

export const store = configureStore({
    reducer: {
        common: commonReducer,
        user: userReducer,
        category: categoryReducer,
        product: productReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;