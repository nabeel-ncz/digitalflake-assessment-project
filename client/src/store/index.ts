import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./reducers/common";
import userReducer from "./reducers/user";

export const store = configureStore({
    reducer: {
        common: commonReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;