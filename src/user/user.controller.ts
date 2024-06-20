import { Controller, Post, Get, Param, Body } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async register(@Body() body: { username: string; email: string }) {
    const { username, email } = body;
    const user = await this.userService.registerUser(username, email);
    return {
      message:
        "Registration successful, please check your email for verification.",
      user,
    };
  }

  @Get("verify-email/:username/:verificationToken")
  async verifyEmail(
    @Param("username") username: string,
    @Param("verificationToken") token: string
  ) {
    const result = await this.userService.verifyUser(username, token);
    return { message: result };
  }

  @Get("check-verification/:username")
  async checkVerification(@Param("username") username: string) {
    const result = await this.userService.checkVerification(username);
    return { message: result };
  }
}
