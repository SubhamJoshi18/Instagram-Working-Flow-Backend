import { User } from '../database/entity/User.entity';
import { IEditProfile, IUpdateBody } from '../interfaces/updates';
declare class UserProfileService {
    getProfile(userId: number): Promise<User>;
    activateProfile(userId: number): Promise<boolean>;
    deactivateProfile(userId: number): Promise<boolean>;
    updateProfile(userId: number, body: Partial<IUpdateBody>): Promise<void>;
    searchUser(userId: number, username: string): Promise<User[]>;
    editProfile(userId: number, data: Partial<IEditProfile>): Promise<boolean>;
    followUser(userId: number): Promise<void>;
}
declare const _default: UserProfileService;
export default _default;
//# sourceMappingURL=userProfile.service.d.ts.map