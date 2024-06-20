import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: {
        username: string;
        email: string;
    }): Promise<{
        message: string;
        user: import("./user.schema").User;
    }>;
    verifyEmail(username: string, token: string): Promise<{
        message: string;
    }>;
    checkVerification(username: string): Promise<{
        message: string;
    }>;
}
