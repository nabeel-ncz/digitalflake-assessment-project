import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/axios";
import { AxiosError } from "axios";

export const updatePasswordAction = createAsyncThunk(
    "user/updatePasswordAction",
    async (data : {
        token: string;
        password: string;
    }) => {
        try {
            const response = await apiClient.post(
                `/api/v1/user/reset-password`,
                data,
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