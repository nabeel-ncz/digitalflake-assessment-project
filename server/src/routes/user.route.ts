import express from "express";
import { UserController } from "@/controllers";
import { CurrentUser, RequireAuth } from "@/middlewares";

export default () => {
    const router = express.Router();

    router.route("/")
        .get(CurrentUser, RequireAuth, UserController.getUser);

    router.route("/register")
        .post(UserController.signup);

    router.route("/login")
        .post(UserController.login);

    router.route("/request-reset-password")
        .post(UserController.requestForgotPassword);

    router.route("/reset-password")
        .post(UserController.updatePassword);

    router.route("/:id")
        .delete(CurrentUser, RequireAuth, UserController.logout)

    return router;
}