import { Product } from "@/database/models/product.model";
import mongoose from "mongoose";

interface IProductPayload {
    _id?: string | mongoose.Types.ObjectId;
    userRef: string | mongoose.Types.ObjectId;
    categoryRef: string | mongoose.Types.ObjectId;
    name: string;
    description: string;
    size: number;
    price: number;
    image: string;
    status: string;
}

export const create = async (
    data: IProductPayload
) => {
    const result = await Product.create(data);
    return result;
}

export const update = async (
    data: IProductPayload
) => {
    const { _id, ...rest } = data;
    const result = await Product.findByIdAndUpdate(_id, {
        $set: { ...rest }
    }, {
        new: true
    });
    return result;
}

export const findAll = async (
    data: { userId?: string; page: string; limit: string; }
) => {
    const page = Number(data.page) ?? 1;
    const limit = Number(data.limit) ?? 5;
    const skip = (page - 1) * limit;
    const result = await Product.find({
        userRef: data.userId
    }).skip(skip).limit(limit).populate("categoryRef");
    return result;
}

export const findById = async (
    data: { _id: string; }
) => {
    const result = await Product.findById(data._id).populate("categoryRef");
    return result;
}