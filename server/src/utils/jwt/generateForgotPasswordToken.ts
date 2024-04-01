import jwt from "jsonwebtoken";

export const generateForgotPasswordToken = (
    payload: {
        email: string;
    }
) => {
    return jwt.sign(
        payload,
        String(process.env.FORGOT_PASSWORD_TOKEN_SECRET),
        { expiresIn: '1h' }
    );
};