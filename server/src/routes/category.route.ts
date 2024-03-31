import express from "express";
import { CategoryController } from "@/controllers";
import { CurrentUser, RequireAuth } from "@/middlewares";

export default () => {
    const router = express.Router();

    router.route("/")
        .post(CurrentUser, RequireAuth, CategoryController.create)
        .put(CurrentUser, RequireAuth, CategoryController.update)
        .get(CurrentUser, RequireAuth, CategoryController.findAll);

    router.route("/:id")
        .get(CurrentUser, RequireAuth, CategoryController.findById)
        .delete(CurrentUser, RequireAuth, CategoryController.deleteById);

    return router;
}