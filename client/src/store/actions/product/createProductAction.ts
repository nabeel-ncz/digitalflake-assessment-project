import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/axios";
import { AxiosError } from "axios";

export const createProductAction = createAsyncThunk(
    "user/createProductAction",
    async (data: {
        userRef: string;
        categoryRef: string;
        name: string;
        description: string;
        size: number;
        price: number;
        image: string;
        status: string;
    }) => {
        try {
            const response = await apiClient.post(
                `/api/v1/product`,
                data,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            const e: any = error as AxiosError;
            throw new Error(e.response?.data.error || e.message);
        }
    }
);