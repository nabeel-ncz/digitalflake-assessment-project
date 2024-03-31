import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks"
import { createCategorySchema } from "../../utils/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategoryAction } from "../../store/actions/category";
import { useNavigate } from "react-router";

export default function CreateCategory() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error, loading } = useAppSelector((state) => state.category);
    const user = useAppSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof createCategorySchema>>({
        resolver: zodResolver(createCategorySchema)
    });

    const onSubmit = (data: {
        name: string;
        description: string;
        status: string;
    }) => {
        dispatch(createCategoryAction({
            ...data,
            userRef: user?.data?._id ?? ""
        })).then(() => {
            navigate("/categories");
        });
    }

    return (
        <div className="w-full min-h-screen flex items-start justify-center px-6 md:px-0">
            <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-start gap-4 py-12">
                {error && (<span className="text-xs text-red-800"> {error}</span>)}
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    <input {...register("name")} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                {errors[`${"name"}`] && <span className="text-xs text-red-800"> {errors[`${"name"}`]?.message}</span>}
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <input {...register("description")} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                {errors[`${"description"}`] && <span className="text-xs text-red-800"> {errors[`${"description"}`]?.message}</span>}
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Status</span>
                    </div>
                    <select {...register("status")} className="select select-bordered">
                        <option disabled selected value={""}>Pick one</option>
                        <option value={"active"}>Active</option>
                        <option value={"inactive"}>Inactive</option>
                    </select>
                </label>
                {errors[`${"status"}`] && <span className="text-xs text-red-800"> {errors[`${"status"}`]?.message}</span>}
                <button onClick={!loading ? handleSubmit(onSubmit) : () => { }} className={`btn btn-primary w-full ${loading ? "opacity-40" : ""}`}>
                    {loading ? "Creating..." : "Create"}
                </button>
            </div>
        </div>
    )
}
