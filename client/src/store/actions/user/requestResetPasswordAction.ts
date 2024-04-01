import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/axios";
import { AxiosError } from "axios";

export const requestResetPasswordAction = createAsyncThunk(
    "user/requestResetPasswordAction",
    async (data : {
        email: string;
    }) => {
        try {
            const response = await apiClient.post(
                `/api/v1/user/request-reset-password`,
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