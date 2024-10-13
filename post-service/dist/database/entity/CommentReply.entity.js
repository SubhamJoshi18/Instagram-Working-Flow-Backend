"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentReply = void 0;
const typeorm_1 = require("typeorm");
const Comment_entity_1 = require("./Comment.entity");
let CommentReply = class CommentReply {
};
exports.CommentReply = CommentReply;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CommentReply.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CommentReply.prototype, "comment_reply", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Comment_entity_1.Comment, (comments) => comments.commentReply),
    __metadata("design:type", Comment_entity_1.Comment)
], CommentReply.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CommentReply.prototype, "reply_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CommentReply.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], CommentReply.prototype, "deleted_at", void 0);
exports.CommentReply = CommentReply = __decorate([
    (0, typeorm_1.Entity)()
], CommentReply);
//# sourceMappingURL=CommentReply.entity.js.map