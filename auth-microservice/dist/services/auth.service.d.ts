import { IRegisterBody } from '../interfaces/register';
import { ILoginBody } from '../interfaces/login';
declare class AuthService {
    registerUser(data: IRegisterBody): Promise<any>;
    loginUser(data: ILoginBody): Promise<any>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map