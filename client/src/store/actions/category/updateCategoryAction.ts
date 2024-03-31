import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/axios";
import { AxiosError } from "axios";

export const updateCategoryAction = createAsyncThunk(
    "user/updateCategoryAction",
    async (data: {
        _id: string;
        name: string;
        description: string;
        status: string;
    }) => {
        try {
            const response = await apiClient.put(
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