import express from "express";

export default () => {
    const router = express.Router();

    router.route("/")
        .get()
        .put();

    router.route("/register")
        .post();

    router.route("/verify-otp")
        .post();
    
    router.route("/login")
        .post();

    router.route("/request-reset-password")
        .post();

    router.route("/reset-password")
        .post();

    return router;
}