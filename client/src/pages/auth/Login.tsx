import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { loginSchema } from "../../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import ZodInputLogin from "../../components/form/ZodInputLogin";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginAction } from "../../store/actions/user";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data, error, loading } = useAppSelector((state) => state.user);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!data && searchParams.get("message")) {
            toast.error("Unauthorized Access, Please log-in to your account!",
                { position: "top-right" }
            );
            setSearchParams("");
        }
    }, []);

    const navigateToSignup = () => { navigate("/register") };
    const navigateToForgotPassword = () => { navigate("/forgot-password") };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = (data: {
        email: string;
        password: string;
    }) => {
        dispatch(loginAction(data)).then(() => {
            navigate("/", { replace: true });
        });
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-6 md:px-0">
            <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-start gap-4 py-24">
                {error && (<span className="text-xs text-red-800"> {error}</span>)}
                <ZodInputLogin
                    name={"email"}
                    register={register}
                    errors={errors}
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                    }
                    type={"text"}
                    placeholder={"Email"}
                />
                <ZodInputLogin
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                    }
                    type={"password"}
                    placeholder={"Password"}
                    name={"password"}
                    register={register}
                    errors={errors}
                />
                <div className="w-full flex items-center justify-end">
                    <span
                        onClick={navigateToForgotPassword}
                        className="text-blue-700 cursor-pointer">Forgot password ?</span>
                </div>
                <p >Don't have an account <span
                    onClick={navigateToSignup}
                    className="text-blue-700 cursor-pointer">Signup ?</span></p>
                <button onClick={!loading ? handleSubmit(onSubmit) : () => { }} className={`btn btn-primary w-full ${loading ? "opacity-40" : ""}`}>
                    {loading ? "Login..." : "Login"}
                </button>
            </div>
        </div>
    )
}
