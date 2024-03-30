import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../utils/axios";
import { AxiosError } from "axios";

export const loginAction = createAsyncThunk(
    "user/loginAction",
    async (data: {
        email: string;
        password: string;
    }) => {
        try {
            const response = await apiClient.post(
                `/api/user/login`,
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
)