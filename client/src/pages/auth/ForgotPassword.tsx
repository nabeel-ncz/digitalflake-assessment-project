import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAppDispatch } from "../../hooks";
import { requestResetPasswordAction } from "../../store/actions/user";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string>("");

    const navigateToLogiin = () => { navigate("/login") };
    const emailValidation = z.object({
        email: z.string().email("Invalid email format!")
    });

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<z.infer<typeof emailValidation>>({
        resolver: zodResolver(emailValidation)
    })

    const onSubmit = (data: {
        email: string
    }) => {
        dispatch(requestResetPasswordAction({
            email: data.email
        })).then((result: any) => {
            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }
            toast.success("The reset password link successfully sent in to your email", { position: "top-right"});
            navigate("/login");
        }).catch((error) => {
            setError(error?.message as string);
        });
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-6 md:px-0">
            <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-start gap-4 py-24">
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input {...register("email")} type="text" className="grow" placeholder="Email" />
                </label>
                {errors[`email`] && <span className="text-xs text-red-800"> {errors[`email`]?.message}</span>}
                {error && <span className="text-xs text-red-800"> {error}</span>}
                <button onClick={handleSubmit(onSubmit)} className="btn btn-primary w-full">Request reset link</button>
                <div className="w-full flex items-center justify-center">
                    <span
                        onClick={navigateToLogiin}
                        className="text-blue-700 cursor-pointer">Back to login ?</span>
                </div>
            </div>
        </div>
    )
}
