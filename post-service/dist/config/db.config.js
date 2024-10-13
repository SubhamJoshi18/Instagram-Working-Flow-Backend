"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const User_entity_1 = require("../database/entity/User.entity");
const UserProfile_entity_1 = require("../database/entity/UserProfile.entity");
const Comment_entity_1 = require("../database/entity/Comment.entity");
const CommentReply_entity_1 = require("../database/entity/CommentReply.entity");
const Posts_entity_1 = require("../database/entity/Posts.entity");
exports.dbConfig = {
    type: 'mysql',
    host: 'localhost',
    port: Number(3306),
    username: 'root',
    password: 'r0bonepal77@',
    database: 'instagram',
    migrationsTableName: 'migrations',
    synchronize: true,
    // logging: process.env.NODE_ENV === "dev",
    entities: [User_entity_1.User, UserProfile_entity_1.UserProfile, Posts_entity_1.Post, Comment_entity_1.Comment, CommentReply_entity_1.CommentReply],
    logging: false,
};
//# sourceMappingURL=db.config.js.map