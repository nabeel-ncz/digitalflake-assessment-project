import { generateAccessToken, verifyToken } from "@/utils/jwt";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
    _id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload
        }
    }
}

export const CurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const { access_token, refresh_token } = req.cookies;

        if (!access_token && !refresh_token) {
            return next();
        }

        let user;

        if (access_token) {
            user = await verifyToken(
                access_token,
                String(process.env.ACCESS_TOKEN_SECRET)
            );
        }

        if (!user && refresh_token) {
            user = await verifyToken(
                refresh_token,
                String(process.env.REFRESH_TOKEN_SECRET)
            );

            if (user) {
                const newAccessToken = generateAccessToken(user);
                res.cookie("access_token", newAccessToken, {
                    httpOnly: true,
                });
            }
        }

        req.user = user!;
        next();

    } catch (error) {
        next();
    }
}

export const RequireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (!req.user) {
        throw new Error("Unauthorized!");
    }

    next();
}

export const ErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(400).json({error: err?.message ?? "Something went wrong!"});
}