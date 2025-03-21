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
exports.default = Student_Login_Google;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Student_model_1 = __importDefault(require("../../../../../../../models/Student.model"));
function Student_Login_Google(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            if (!email) {
                res.status(200).json({ success: false, message: "Email and password are required." });
                return;
            }
            const student = yield Student_model_1.default.findOne({ email });
            if (!student) {
                res.status(200).json({ success: false, message: "Account not found" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                id: student._id, email: student.email
            }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                user: {
                    id: student._id,
                    name: student.name,
                    email: student.email,
                    profileImage: student.profileImage,
                    batch: student.batch,
                    linkedin: student.linkedin,
                    bio: student.bio,
                    interests: student.interests
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
;
