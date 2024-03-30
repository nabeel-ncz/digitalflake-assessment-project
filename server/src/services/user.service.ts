import { User } from "@/database/models";

export const createUser = async (
    data: { name: string; email: string; password: string }
) => {
    const result = await User.create({
        ...data
    });
    return result;
};

export const updateUser = async (
    data: { _id: string; name: string; email: string; password: string }
) => {
    const { _id, ...rest } = data;
    const updated = await User.findByIdAndUpdate(_id, {
        $set: { ...rest }
    }, {
        new: true
    });
    return updated;
}

export const findById = async (id: string) => {
    const data = await User.findById(id);
    return data;
}

export const updatePassword = async (
    data: { email: string; password: string }
) => {
    const updatedUser = await User.findOneAndUpdate({
        email: data.email
    }, {
        password: data.password
    }, {
        new: true
    });
    return updatedUser;
}

export const findByEmail = async (
    email: string
) => {
    const existingUser = await User.findOne({
        email: email
    });
    return existingUser;
}
