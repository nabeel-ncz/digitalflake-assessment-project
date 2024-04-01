import { UserService } from "@/services";
import { comparePassword, hashPassword } from "@/utils/bcrypt";
import { generateAccessToken, generateRefreshToken, validateForgotPasswordToken } from "@/utils/jwt";
import { loginSchema, signupSchema } from "@/utils/validation";
import { Request, Response, NextFunction } from "express"

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { value, error } = signupSchema.validate(req.body);

        if (error) {
            throw new Error(error.message || "Validation Error!");
        }

        value.password = await hashPassword(value.password);

        const user = await UserService.createUser({
            ...value
        });

        const accessToken = generateAccessToken({
            _id: user?._id.toString(),
            email: user?.email
        });

        const refreshToken = generateRefreshToken({
            _id: user?._id.toString(),
            email: user?.email
        })

        res.cookie("access_token", accessToken, {
            httpOnly: true
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true
        });

        res.status(201).json({ data: user });

    } catch (error) {
        next(error);
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { value, error } = loginSchema.validate(req.body);

        if (error) {
            throw new Error(error.message || "Validation Error!");
        }

        const user = await UserService.findByEmail(value?.email);

        if (!user) {
            throw new Error("Email or password is incorrect!");
        }

        const match = await comparePassword(value?.password, user.password);

        if (!match) {
            throw new Error("Email or password is incorrect!");
        }

        const accessToken = generateAccessToken({
            _id: user?._id.toString(),
            email: user?.email
        });

        const refreshToken = generateRefreshToken({
            _id: user?._id.toString(),
            email: user?.email
        })

        res.cookie("access_token", accessToken, {
            httpOnly: true
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true
        });

        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await UserService.findById(req.user?._id as string);
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
}

export const requestForgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.body;
        const result = await UserService.findByEmail(email);
        if (!result) {
            throw new Error("Account doesn't exist!");
        };
        await UserService.sendForgotPasswordMail({
            email: email as string
        });
        res.status(200).json({});
    } catch (error) {
        next(error);
    }
}

export const updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token, password } = req.body;
        const data = await validateForgotPasswordToken(token);
        const hash = await hashPassword(password);
        const result = await UserService.updatePassword({
            email: data?.email as string,
            password: hash
        });
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
}

export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.cookie("access_token", "", {
        maxAge: 0
    });
    res.cookie("refresh_token", "", {
        maxAge: 0
    });0
    res.status(204).json({});
}