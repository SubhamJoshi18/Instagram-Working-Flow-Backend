import { CommentReply } from './CommentReply.entity';
import { Post } from './Posts.entity';
export declare class Comment {
    id: number;
    comment: string;
    comment_like: string;
    post: Post;
    commentReply: CommentReply[];
    commented_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
//# sourceMappingURL=Comment.entity.d.ts.map