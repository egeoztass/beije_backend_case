"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async registerUser(username, email) {
        const verificationToken = crypto.randomBytes(16).toString("hex");
        const newUser = new this.userModel({
            username,
            email,
            verificationToken,
            isVerified: false,
        });
        await newUser.save();
        this.sendVerificationEmail(email, verificationToken);
        return newUser;
    }
    async verifyUser(username, token) {
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
    async checkVerification(username) {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new Error("User not found.");
        }
        return user.isVerified ? "User is verified" : "User is not verified";
    }
    async sendVerificationEmail(email, token) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEYS);
        const msg = {
            to: email,
            from: "egeoztas@sabanciuniv.edu",
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map