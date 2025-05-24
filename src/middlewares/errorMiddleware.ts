import { Request, Response, NextFunction } from 'express';


class ApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

const loggableErrors = [400, 401, 403, 404, 405, 408, 500, 502];


const errorMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {

    const statusCode = err.statusCode || 500;

    const message = err.message || 'Erro interno no servidor';

    if (loggableErrors.includes(statusCode)) {
        console.error(JSON.stringify({
            method: req.method,
            url: req.originalUrl,
            statusCode,
            message,
            headers: req.headers,
            body: req.body,
            ip: req.ip
        }));
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
};

export { ApiError, errorMiddleware };
