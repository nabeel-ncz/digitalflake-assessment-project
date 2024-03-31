import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/axios";
import { AxiosError } from "axios";

export const createCategoryAction = createAsyncThunk(
    "user/createCategoryAction",
    async (data: {
        userRef: string;
        name: string;
        description: string;
        status: string;
    }) => {
        try {
            const response = await apiClient.post(
                `/api/v1/category`,
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