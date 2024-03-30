import express from "express";
import { UserController } from "@/controllers";

export default () => {
    const router = express.Router();

    router.route("/")
        .get()
        .put();

    router.route("/register")
        .post(UserController.signup);

    router.route("/verify-otp")
        .post();
    
    router.route("/login")
        .post(UserController.login);

    router.route("/request-reset-password")
        .post();

    router.route("/reset-password")
        .post();

    return router;
}