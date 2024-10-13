import { BaseEntity } from 'typeorm';
import { User } from './User.entity';
import { Comment } from './Comment.entity';
export declare class Post extends BaseEntity {
    id: number;
    title: string;
    description: string;
    photo: string;
    likes: number;
    comment: Comment[];
    user: User;
    created_at: Date;
    updated_at: Date;
    deleted_At: Date;
}
//# sourceMappingURL=Posts.entity.d.ts.map