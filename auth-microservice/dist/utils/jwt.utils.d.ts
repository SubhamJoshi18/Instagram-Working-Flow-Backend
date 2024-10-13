interface IPayload {
    username: string;
    email: string;
    userId: number;
}
declare class JWTUtils {
    static createAccessToken(data: IPayload): Promise<unknown>;
}
export default JWTUtils;
//# sourceMappingURL=jwt.utils.d.ts.map