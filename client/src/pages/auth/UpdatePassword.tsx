import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useAppDispatch } from "../../hooks";
import { updatePasswordAction } from "../../store/actions/user";
import toast from "react-hot-toast";
import { useState } from "react";

export default function UpdatePassword() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [error, setError] = useState<string>("");

    const navigateToLogiin = () => { navigate("/login") };
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const validtaion = z.object({
        password: z.string().min(1, "Password is required")
            .refine((value) => passwordRegex.test(value), {
                message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
            }),
        confirmPassword: z.string().min(1, "Confirm Password is required")
    }).refine((data: any) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });;

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<z.infer<typeof validtaion>>({
        resolver: zodResolver(validtaion)
    })

    const onSubmit = (data: {
        password: string;
        confirmPassword: string;
    }) => {
        dispatch(updatePasswordAction({
            token: searchParams.get("token") as string,
            password: data.password
        })).then((result: any) => {
            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }
            toast.success("The reset password link successfully sent in to your email", { position: "top-right" });
            navigate("/login");
        }).catch((error) => {
            setError(error?.message as string);
        })
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-6 md:px-0">
            <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-start gap-4 py-24">
                {error && <span className="text-xs text-red-800"> {error}</span>}
                <>
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input {...register("password")} type={"password"} className="grow" placeholder={"Password"} />
                    </label>
                    {errors[`${"password"}`] && <span className="text-xs text-red-800"> {errors[`${"password"}`]?.message}</span>}
                </>
                <>
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input {...register("confirmPassword")} type={"password"} className="grow" placeholder={"Confirm password"} />
                    </label>
                    {errors[`${"confirmPassword"}`] && <span className="text-xs text-red-800"> {errors[`${"confirmPassword"}`]?.message}</span>}
                </>
                <button onClick={handleSubmit(onSubmit)} className="btn btn-primary w-full">Update password</button>
                <div className="w-full flex items-center justify-center">
                    <span
                        onClick={navigateToLogiin}
                        className="text-blue-700 cursor-pointer">Back to login ?</span>
                </div>
            </div>
        </div>
    )
}
