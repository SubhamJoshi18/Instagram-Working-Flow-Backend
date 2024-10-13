"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Posts_entity_1 = require("../database/entity/Posts.entity");
const User_entity_1 = require("../database/entity/User.entity");
const exceptions_1 = require("../exceptions");
class PostService {
    async createPost(data, userId) {
        const user = await User_entity_1.User.findOne({
            where: {
                id: userId,
            },
            relations: {
                userProfile: true,
            },
        });
        if (!data.title || !data.description) {
            throw new exceptions_1.DatabaseException(null, 'Title or description is empty');
        }
        await Posts_entity_1.Post.createQueryBuilder()
            .insert()
            .into(Posts_entity_1.Post)
            .values([{ ...data, user: user }])
            .execute();
        return true;
    }
    async getAllPost() {
        const allPosts = await Posts_entity_1.Post.find({});
        if (allPosts.length === 0) {
            throw new exceptions_1.DatabaseException(null, 'Post is Empty');
        }
        return allPosts;
    }
    async getPostById(userId) {
        const user = await User_entity_1.User.findOne({
            where: {
                id: userId,
            },
            relations: {
                posts: true,
            },
        });
        const checkUserPost = user?.posts.length > 0 ? user?.posts : [];
        if (checkUserPost?.length === 0) {
            throw new exceptions_1.DatabaseException(null, 'User does not have post anything');
        }
        const userPost = [];
        for (const post of checkUserPost) {
            const postPayload = {
                post_id: post.id,
                post_title: post.title,
                post_description: post.description,
                post_photo: post.photo ? post.photo : 'No Image',
                post_likes: post.likes,
                post_created_at: post.created_at,
            };
            userPost.push(postPayload);
        }
        return userPost;
    }
}
exports.default = new PostService();
//# sourceMappingURL=post.service.js.map