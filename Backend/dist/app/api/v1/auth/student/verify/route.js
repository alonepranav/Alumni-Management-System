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
exports.default = Student_Verify;
const Student_model_1 = __importDefault(require("../../../../../../models/Student.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function Student_Verify(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token, email } = req.body;
            if (!token || !email) {
                res.status(200).json({ success: false, message: "Missing required fields." });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const student = yield Student_model_1.default.findOne({ email });
            if (!student) {
                res.status(200).json({ success: false, message: "User not found" });
                return;
            }
            const newToken = jsonwebtoken_1.default.sign({ id: student._id, email: student.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.status(200).json({
                success: true,
                message: "Token refreshed successfully",
                token: newToken,
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
            res.status(500).json({ success: false, message: "Invalid or expired token" });
            return;
        }
    });
}
;
