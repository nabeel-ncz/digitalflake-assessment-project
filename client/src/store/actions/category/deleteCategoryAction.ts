import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/axios";
import { AxiosError } from "axios";

export const deleteCategoryAction = createAsyncThunk(
    "user/deleteCategoryAction",
    async (data: {
        _id: string
    }) => {
        try {
            const response = await apiClient.delete(
                `/api/v1/category/${data?._id}`,
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