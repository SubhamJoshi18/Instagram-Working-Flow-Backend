"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const exceptions_1 = require("../exceptions");
const logger_1 = require("../libs/logger");
const errorLogger = (0, logger_1.createLogger)('error-logger');
const errorMiddleware = (error, req, res, next) => {
    console.log(error);
    if (error instanceof exceptions_1.HttpException) {
        errorLogger.error(`Error En-countered in the HTTP Exception`);
        return res.status(error.getStatusCode()).json({
            message: error.getMessage(),
            name: error.name,
        });
    }
    return res.status(500).json({
        message: 'INTERNAL SERVER ERROR',
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map