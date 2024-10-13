"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_router_1 = __importDefault(require("./router/server.router"));
const logger_1 = require("./libs/logger");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const connect_1 = __importDefault(require("./database/connect"));
dotenv_1.default.config();
const expressLogger = (0, logger_1.createLogger)('express-logger');
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT || 3002;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(async () => {
    await connect_1.default.initialize()
        .then((db) => {
        expressLogger.info(`Initialized '${db.options.database}' database successfully`);
    })
        .catch((err) => {
        expressLogger.error('Error while intializing database. Error: ' + err);
        process.exit(0);
    });
})();
app.use(server_router_1.default);
app.use(errorMiddleware_1.errorMiddleware);
app.listen(port, () => {
    expressLogger.info(`Server is running on the http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map