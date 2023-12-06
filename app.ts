import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors
app.use(
	cors({
		origin: process.env.CORS_ORIGIN
	})
);

// testing Api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({
		success: true,
		status: 200,
		message: "Api is working"
	});
});

// handle all routes
app.use("*", (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Route ${req.originalUrl} is not found`);
	next(error);
});

export { app };
