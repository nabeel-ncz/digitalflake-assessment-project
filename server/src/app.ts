import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { ErrorHandler } from "@/middlewares";
import { UserRouter, ProductRouter, CategoryRouter } from "@/routes";

const app: Application = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));

app.use("/api/v1/user", UserRouter());
app.use("/api/v1/product", ProductRouter());
app.use("/api/v1/category", CategoryRouter());

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new Error("Page not found"));
});

app.use(ErrorHandler);

export const listen = () => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`⚡Server listening at ${port}`);
    });
    return app;
};