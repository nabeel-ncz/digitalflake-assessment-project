import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/axios";
import { AxiosError } from "axios";

export const deleteProductAction = createAsyncThunk(
    "user/deleteProductAction",
    async (data: {
        _id: string
    }) => {
        try {
            const response = await apiClient.delete(
                `/api/v1/product/${data?._id}`,
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
);