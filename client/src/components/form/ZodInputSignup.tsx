import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function ZodInputSignup({
    svg,
    placeholder,
    type,
    name,
    register,
    errors
}: {
    svg: React.ReactNode
    placeholder: string
    type: string,
    register: UseFormRegister<{
        email: string;
        password: string;
        name: string;
    }>
    errors: FieldErrors<{
        name: string;
        email: string;
        password: string;
    }>,
    name: "name" | "email" | "password"
}) {
    return (
        <>
            <label className="input input-bordered flex items-center gap-2 w-full">
                {svg}
                <input {...register(name)} type={type} className="grow" placeholder={placeholder} />
            </label>
            {errors[`${name}`] && <span className="text-xs text-red-800"> {errors[`${name}`]?.message}</span>}
        </>
    )
}
