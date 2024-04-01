import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks"
import { createProductSchema } from "../../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { createProductAction } from "../../store/actions/product";
import { uploadToCloudinary } from "../../utils/cloudinary";
import { getCategoriesAction } from "../../store/actions/category";
import { productLoading } from "../../store/reducers/product";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function CreateProduct() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error, loading } = useAppSelector((state) => state.product);
    const { data: categories } = useAppSelector((state) => state.category);
    const { data: user } = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(getCategoriesAction({
            userId: user?._id ?? ""
        }));
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof createProductSchema>>({
        resolver: zodResolver(createProductSchema)
    });

    const onSubmit = async (data: {
        name: string;
        description: string;
        category: string;
        size: string;
        price: string;
        image?: any;
        status: string;
    }) => {
        dispatch(productLoading(true));

        const { category, image, size, price, ...rest } = data;
        if (!image) {
            return toast.error("Image is required from product creation");
        }
        const formData = new FormData();
        formData.append("file", image[0]);
        formData.append("upload_preset", "ml_default");
        const url = await uploadToCloudinary(formData, "image");
        if (!url) {
            return toast.error("Something went wrong in uploading image");
        }
        dispatch(createProductAction({
            ...rest,
            size: Number(size),
            price: Number(price),
            image: url,
            userRef: user?._id ?? "",
            categoryRef: category
        })).then(() => {
            navigate("/products");
        }).finally(() => {
            productLoading(false);
        });
    }

    return (
        <div className="w-full min-h-screen flex items-start justify-center px-6 md:px-0">
            <div className="w-full flex flex-col lg:flex-row items-start gap-12 py-12 px-12 lg:px-32">
                <div className="w-1/2 flex flex-col items-start justify-center">
                    {error && (<span className="text-xs text-red-800"> {error}</span>)}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name : </span>
                        </div>
                        <input {...register("name")} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </label>
                    {errors[`${"name"}`] && <span className="text-xs text-red-800"> {errors[`${"name"}`]?.message}</span>}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Description : </span>
                        </div>
                        <input {...register("description")} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </label>
                    {errors[`${"description"}`] && <span className="text-xs text-red-800"> {errors[`${"description"}`]?.message}</span>}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Size : </span>
                        </div>
                        <input {...register("size")} type="number" placeholder="Type here" className="input input-bordered w-full" />
                    </label>
                    {errors[`${"size"}`] && <span className="text-xs text-red-800"> {errors[`${"size"}`]?.message}</span>}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Price : </span>
                        </div>
                        <input {...register("price")} type="number" placeholder="Type here" className="input input-bordered w-full" />
                    </label>
                    {errors[`${"price"}`] && <span className="text-xs text-red-800"> {errors[`${"price"}`]?.message}</span>}
                </div>
                <div className="w-1/2 flex flex-col items-start justify-center">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Category : </span>
                        </div>
                        <select {...register("category")} className="select select-bordered">
                            <option disabled selected value={""}>Pick one</option>
                            {categories?.map((item) => (
                                <option value={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </label>
                    {errors[`${"category"}`] && <span className="text-xs text-red-800"> {errors[`${"category"}`]?.message}</span>}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Image : </span>
                        </div>
                        <input {...register("image")} accept="image/*" type="file" className="file-input file-input-bordered file-input-primary w-full" />
                    </label>
                    {errors[`${"image"}`] && <span className="text-xs text-red-800"> {errors[`${"image"}`]?.message?.toString()}</span>}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Status : </span>
                        </div>
                        <select {...register("status")} className="select select-bordered">
                            <option disabled selected value={""}>Pick one</option>
                            <option value={"active"}>Active</option>
                            <option value={"inactive"}>Inactive</option>
                        </select>
                    </label>
                    {errors[`${"status"}`] && <span className="text-xs text-red-800"> {errors[`${"status"}`]?.message}</span>}
                    <button onClick={!loading ? handleSubmit(onSubmit) : () => { }} className={`mt-9 btn btn-primary w-full ${loading ? "opacity-40" : ""}`}>
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    )
}
