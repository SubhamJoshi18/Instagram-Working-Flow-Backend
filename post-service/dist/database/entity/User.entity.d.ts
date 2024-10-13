import { BaseEntity } from 'typeorm';
import { UserProfile } from './UserProfile.entity';
import { Post } from './Posts.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    userProfile: UserProfile;
    posts: Post[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
//# sourceMappingURL=User.entity.d.ts.map