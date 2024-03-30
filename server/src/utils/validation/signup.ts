import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi
        .string()
        .min(1)
        .required(),
        
    email: Joi
        .string()
        .email()
        .required(),

    password: Joi
        .string()
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .required(),
})