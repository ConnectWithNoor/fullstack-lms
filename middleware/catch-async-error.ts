import { NextFunction, Request, Response } from "express";

const catchAsyncErrorMiddleware =
	(func: (req: Request, res: Response, next: NextFunction) => void) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(func(req, res, next)).catch(next);
	};

export { catchAsyncErrorMiddleware };
