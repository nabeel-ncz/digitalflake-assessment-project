import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    categoryRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    size: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export const Product = mongoose.model("products", schema);