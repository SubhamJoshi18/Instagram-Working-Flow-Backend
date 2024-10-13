"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const db_config_1 = require("../config/db.config");
const AppDataSource = new typeorm_1.DataSource(db_config_1.dbConfig);
exports.default = AppDataSource;
//# sourceMappingURL=connect.js.map