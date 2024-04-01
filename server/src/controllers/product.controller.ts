import { ProductService } from "@/services";
import { Request, Response, NextFunction } from "express";

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body;
        const product = await ProductService.create(data);
        if (!product) {
            throw new Error("Product creation failed");
        }
        res.status(201).json({ data: product });
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
        const product = await ProductService.update(data);
        if (!product) {
            throw new Error("Product updation failed");
        }
        res.status(200).json({ data: product });
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
        const products = await ProductService.findAll({
            userId: user?._id,
            page: page,
            limit: limit
        });
        res.status(200).json({ data: products });
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
        const productId = req.params?.id as string;
        const product = await ProductService.findById({
            _id: productId
        });
        if(!product){
            throw new Error("No Product found!");
        }
        res.status(200).json({ data: product });
    } catch (error) {
        next(error);
    }
}


export const deleteById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const productId = req.params?.id as string;
        await ProductService.deleteById({
            _id: productId
        });
        res.status(204).json({});
    } catch (error) {
        next(error);
    }
}