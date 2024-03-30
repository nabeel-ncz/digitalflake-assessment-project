import { CategoryService } from "@/services";
import { Request, Response, NextFunction } from "express";

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body;
        const category = await CategoryService.create(data);
        if (!category) {
            throw new Error("Category creation failed");
        }
        res.status(201).json({ data: category });
    } catch (error) {
        next(error);
    }
}

export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body;
        const category = await CategoryService.update(data);
        if (!category) {
            throw new Error("Category updation failed");
        }
        res.status(200).json({ data: category });
    } catch (error) {
        next(error);
    }
}

export const findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user;
        const page = req.query?.page as string;
        const limit = req.query?.limit as string;
        const categories = await CategoryService.findAll({
            userId: user?._id,
            page: page,
            limit: limit
        });
        res.status(200).json({ data: categories });
    } catch (error) {
        next(error);
    }
}

export const findById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categoryId = req.params?.id as string;
        const category = await CategoryService.findById({
            _id: categoryId
        });
        if(!category){
            throw new Error("No categry found!");
        }
        res.status(200).json({ data: category });
    } catch (error) {
        next(error);
    }
}