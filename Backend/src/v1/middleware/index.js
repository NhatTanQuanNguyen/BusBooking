import { v4 as uuidv4 } from 'uuid';

export const generateRequestId = (req, res, next) => {
    const requestId = req.requestId || uuidv4();
    req.requestId = requestId;
    next();
};

export const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
};

export * from "./apiKey.middleware.js";
export * from "./permission.middleware.js";
