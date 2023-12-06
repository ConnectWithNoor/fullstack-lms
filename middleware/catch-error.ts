import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error-handler";

const catchErrorMiddleware = (
	error: any,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	error.statusCode = error.statusCode || 500;
	error.message = error.message || "Internal server error";

	// wrong mongodb id error
	if (error.name === "CastError") {
		//CastError is when Id isn't found in the collection.
		const message = `Resource not found. Invalid ${error.path}`;
		error = new ErrorHandler(message, 400);
	}

	// mongodb duplicate key error
	if (error.code === 11000) {
		const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
		error = new ErrorHandler(message, 400);
	}

	// invalid jwt token
	if (error.name === "JsonWebTokenError") {
		const message = `Jwt is invalid, please try again`;
		error = new ErrorHandler(message, 400);
	}

	// jwt expired token
	if (error.name === "TokenExpiredError") {
		const message = `Jwt is expired, please try again`;
		error = new ErrorHandler(message, 400);
	}

	response.status(error.statusCode).json({
		success: false,
		message: error.message,
		code: error.statusCode
	});
};

export { catchErrorMiddleware };
