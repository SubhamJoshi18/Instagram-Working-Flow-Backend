import { BaseEntity } from 'typeorm';
import { UserProfile } from './UserProfile.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    userProfile: UserProfile;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
//# sourceMappingURL=User.entity.d.ts.map