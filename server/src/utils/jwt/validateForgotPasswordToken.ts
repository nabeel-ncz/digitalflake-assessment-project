import jwt from "jsonwebtoken";

export const validateForgotPasswordToken = (token: string) => {
    return new Promise((resolve, reject) => {
        const secret= process.env.FORGOT_PASSWORD_TOKEN_SECRET as string || "";
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};