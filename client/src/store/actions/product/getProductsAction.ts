import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/axios";
import { AxiosError } from "axios";

export const getProductsAction = createAsyncThunk(
    "user/getProductsAction",
    async (data: {
        page?: number;
        limit?: number;
        userId: string;
    }) => {
        try {
            const response = await apiClient.get(
                `/api/v1/product?user=${data.userId}&page=${data?.page}&limit=${data?.limit}`,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            const e: any = error as AxiosError;
            throw new Error(e.response?.data.error || e.message);
        }
    }
)