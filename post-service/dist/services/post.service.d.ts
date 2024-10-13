import { Post } from '../database/entity/Posts.entity';
import { ICreatePost } from '../interfaces';
declare class PostService {
    createPost(data: ICreatePost, userId: number): Promise<boolean>;
    getAllPost(): Promise<Post[]>;
    getPostById(userId: number): Promise<{
        post_id: any;
        post_title: any;
        post_description: any;
        post_photo: any;
        post_likes: any;
        post_created_at: any;
    }[]>;
}
declare const _default: PostService;
export default _default;
//# sourceMappingURL=post.service.d.ts.map