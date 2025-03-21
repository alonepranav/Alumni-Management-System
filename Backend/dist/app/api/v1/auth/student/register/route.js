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
exports.default = Student_Register;
const Student_model_1 = __importDefault(require("../../../../../../models/Student.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function Student_Register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, profileImage, batch, linkedin, bio, interests } = req.body;
            if (!name || typeof name !== "string" || name.trim().length < 3) {
                res.status(200).json({ success: false, message: "Invalid name" });
                return;
            }
            if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
                res.status(200).json({ success: false, message: "Invalid email" });
                return;
            }
            if (!password || typeof password !== "string" || password.length < 6) {
                res.status(200).json({ success: false, message: "Password must be at least 6 characters long" });
                return;
            }
            if (!profileImage || typeof profileImage !== "string") {
                res.status(200).json({ success: false, message: "Invalid profile image URL" });
                return;
            }
            if (!batch || typeof batch !== "string") {
                res.status(200).json({ success: false, message: "Batch is required" });
                return;
            }
            if (!linkedin || typeof linkedin !== "string" || !linkedin.startsWith("https://")) {
                res.status(200).json({ success: false, message: "Invalid LinkedIn URL" });
                return;
            }
            if (!bio || typeof bio !== "string") {
                res.status(200).json({ success: false, message: "Bio must be at least 10 characters long" });
                return;
            }
            if (!interests || typeof interests !== "string" || interests.trim().length < 10) {
                res.status(200).json({ success: false, message: "Interests must be an array with at least one item" });
                return;
            }
            const existingUser = yield Student_model_1.default.findOne({ email });
            if (existingUser) {
                res.status(200).json({ success: false, message: "Email already registered, please use other email to register." });
                return;
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newStudent = new Student_model_1.default({
                name,
                email,
                password: hashedPassword,
                profileImage,
                batch,
                linkedin,
                bio,
                interests
            });
            yield newStudent.save();
            res.status(201).json({ success: true, message: "Student registered successfully" });
            return;
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Server error" });
            return;
        }
    });
}
;
