import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import * as crypto from "crypto";
const sgMail = require("@sendgrid/mail");

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(username: string, email: string): Promise<User> {
    const verificationToken = crypto.randomBytes(16).toString("hex");
    const newUser = new this.userModel({
      username,
      email,
      verificationToken,
      isVerified: false,
    });
    await newUser.save();

    this.sendVerificationEmail(email, verificationToken); // Implement this separately
    return newUser;
  }

  async verifyUser(username: string, token: string): Promise<string> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new Error("User not found.");
    }

    if (user.verificationToken !== token) {
      throw new Error("Invalid token.");
    }

    user.isVerified = true;
    await user.save();

    return "User verified successfully.";
  }

  async checkVerification(username: string): Promise<string> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new Error("User not found.");
    }

    return user.isVerified ? "User is verified" : "User is not verified";
  }

  private async sendVerificationEmail(email: string, token: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEYS);
    const msg = {
      to: email, // Change to your recipient
      from: process.env.MAIL_ADRESS, // Change to your verified sender
      subject: "Your verification code",
      text: "The following is your verification code: " + token,
      html: "<p>${token}</p>",
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
