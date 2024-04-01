import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/axios";
import { getCategoriesAction } from "../../store/actions/category";
import Loader from "../../components/ui/Loader";
import { updateProductAction } from "../../store/actions/product";
import { updateProductSchema } from "../../utils/validation";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "../../utils/cloudinary";

export default function UpdateProduct() {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading } = useAppSelector((state) => state.product);
  const { data: categories } = useAppSelector((state) => state.category);
  const { data: user } = useAppSelector((state) => state.user);
  interface Product {
    name: string;
    category: string;
    description: string;
    status: string;
    size: string;
    price: string;
    image?: any;
  }
  const [formValues, setFormValues] = useState<Product | undefined>(undefined);
  const [loadingValues, setLoadingValues] = useState<boolean>(true);
  const [imageChanged, setImageChanged] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCategoriesAction({
      userId: user?._id ?? ""
    }));
  }, []);

  useEffect(() => {
    apiClient(`/api/v1/product/${id}`, { withCredentials: true })
      .then((res) => {  
        if (res.data?.data) {
          setFormValues({
            ...res.data?.data,
            price: String(res.data?.data?.price),
            size: String(res.data?.data?.size),
            category: res.data?.data?.categoryRef?._id
          });
        }
      }).finally(() => {
        setLoadingValues(false);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "",
      category: "",
      image: "",
      price: "",
      size: ""
    },
    values: formValues
  });

  const onSubmit = async (data: Product) => {
    const { category, size, price, ...rest } = data;
    if (imageChanged && !data?.image[0]) {
      toast.error("Image is required to update", { position: "top-right" });
      return;
    }
    if (imageChanged) {
      const formData = new FormData();
      formData.append("file", data.image[0]);
      formData.append("upload_preset", "ml_default");
      const url = await uploadToCloudinary(formData, "image");
      if (!url) {
        toast.error("Something went wrong in uploading image", { position: "top-right" });
        return;
      }
      rest['image'] = url;
    }
    dispatch(updateProductAction({
      ...rest,
      size: Number(size),
      price: Number(price),
      _id: id ?? "",
      categoryRef: category,
      userRef: user?._id ?? ""
    })).then(() => {
      navigate("/products");
    });
  }

  return (
    <div className="w-full min-h-screen flex items-start justify-center px-6 md:px-0">
      {!loadingValues && !formValues ? (
        <h2 className="font-bold mt-4 text-center">Invalid url, Product not found!</h2>
      ) : (
        <>
          {loadingValues ? (
            <Loader />
          ) : (
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
                    <span className="label-text">Size (KG) : </span>
                  </div>
                  <input {...register("size")} type="number" placeholder="Type here" className="input input-bordered w-full" />
                </label>
                {errors[`${"size"}`] && <span className="text-xs text-red-800"> {errors[`${"size"}`]?.message}</span>}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Price (₹) : </span>
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
                  {!imageChanged ? (
                    <>
                      <div className="relative w-full flex items-center justify-center bg-gray-300 rounded border py-10">
                        <img src={formValues?.image} alt="" className="object-cover" />
                        <button onClick={() => {
                          setImageChanged(true);
                        }} className="absolute bg-red-600 rounded px-4 py-1 top-2 right-2 text-xs">Delete</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <input {...register("image")} accept="image/*" type="file" className="file-input file-input-bordered file-input-primary w-full" />
                    </>
                  )}
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
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          )}
        </>
      )
      }
    </div >
  )
}
