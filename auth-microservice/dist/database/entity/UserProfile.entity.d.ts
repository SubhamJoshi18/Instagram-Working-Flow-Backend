import { BaseEntity } from 'typeorm';
import { User } from './User.entity';
export declare class UserProfile extends BaseEntity {
    id: number;
    fullName: string;
    phoneNumber: string;
    role: string;
    status: boolean;
    follower: User;
    following: User;
    image: string;
    user: User;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
//# sourceMappingURL=UserProfile.entity.d.ts.map