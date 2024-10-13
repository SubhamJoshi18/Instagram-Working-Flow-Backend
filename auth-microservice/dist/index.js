"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_route_1 = __importDefault(require("./router/server.route"));
const logger_1 = require("./libs/logger");
const middleware_1 = require("./middleware");
const connect_1 = __importDefault(require("./database/connect"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.USER_SERVER_PORT || 3000;
const expressLogger = (0, logger_1.createLogger)('express-logger');
app.use(express_1.default.json({}));
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
app.use(server_route_1.default);
app.use(middleware_1.errorMiddleware);
app.listen(port, () => {
    try {
        expressLogger.info(`User Auth is running on the http://localhost:${port}`);
    }
    catch (err) {
        expressLogger.error('Error in starting the Auth Server');
    }
});
//# sourceMappingURL=index.js.map