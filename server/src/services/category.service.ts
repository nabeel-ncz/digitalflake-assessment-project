import { Category } from "@/database/models";
import mongoose from "mongoose";

interface ICategoryPayload {
    _id?: mongoose.Types.ObjectId;
    userRef: mongoose.Types.ObjectId;
    name: string;
    description: string;
    status: "active" | "inactive";
}

export const create = async (
    data: ICategoryPayload
) => {
    const result = await Category.create(data);
    return result;
}

export const update = async (
    data: ICategoryPayload
) => {
    const { _id, ...rest } = data;
    const result = await Category.findByIdAndUpdate(_id, {
        $set: { ...rest }
    }, {
        new: true
    });
    return result;
}

export const findAll = async (
    data: { userId?: string; page: string | number; limit: string | number; }
) => {
    const page = Number(data.page) ?? 1;
    const limit = Number(data.limit) ?? 5;
    const skip = (page - 1) * limit;
    const result = await Category.find({
        userRef: data.userId
    }).skip(skip).limit(limit);
    return result;
}

export const findById = async (
    data: { _id: string; }
) => {
    const result = await Category.findById(data._id);
    return result;
}

export const deleteById = async (
    data: { _id: string }
) => {
    await Category.deleteOne({ _id: data._id });
}