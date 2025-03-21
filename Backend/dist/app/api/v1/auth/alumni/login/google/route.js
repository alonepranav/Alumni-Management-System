"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Alumni_Login_Google;
const Alumni_model_1 = __importDefault(require("../../../../../../../models/Alumni.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function Alumni_Login_Google(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            if (!email) {
                res.status(200).json({ success: false, message: "Email is required." });
                return;
            }
            const alumni = yield Alumni_model_1.default.findOne({ email });
            if (!alumni) {
                res.status(200).json({ success: false, message: "Account not found" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: alumni._id, email: alumni.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                user: {
                    id: alumni._id,
                    name: alumni.name,
                    email: alumni.email,
                    batch: alumni.batch,
                    company: alumni.company,
                    designation: alumni.designation,
                    linkedin: alumni.linkedin,
                    bio: alumni.bio,
                    achievements: alumni.achievements,
                    profileImage: alumni.profileImage
                }
            });
            return;
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Server error" });
            return;
        }
    });
}
