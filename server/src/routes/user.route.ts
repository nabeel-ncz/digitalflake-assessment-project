import express from "express";
import { UserController } from "@/controllers";
import { CurrentUser, RequireAuth } from "@/middlewares";

export default () => {
    const router = express.Router();

    router.route("/")
        .get(CurrentUser, RequireAuth, UserController.getUser)
        .put();

    router.route("/register")
        .post(UserController.signup);
    
    router.route("/login")
        .post(UserController.login);

    router.route("/request-reset-password")
        .post();

    router.route("/reset-password")
        .post();

    return router;
}