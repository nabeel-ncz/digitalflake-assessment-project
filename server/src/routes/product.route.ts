import express from "express";
import { ProductController } from "@/controllers";
import { CurrentUser, RequireAuth } from "@/middlewares";

export default () => {
    const router = express.Router();

    router.route("/")
        .post(CurrentUser, RequireAuth, ProductController.create)
        .put(CurrentUser, RequireAuth, ProductController.update)
        .get(CurrentUser, RequireAuth, ProductController.findAll);

    router.route("/:id")
        .get(CurrentUser, RequireAuth, ProductController.findById);

    return router;
}