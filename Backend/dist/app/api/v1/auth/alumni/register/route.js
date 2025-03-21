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
exports.default = Alumni_Register;
const Alumni_model_1 = __importDefault(require("../../../../../../models/Alumni.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function Alumni_Register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, batch, company, designation, linkedin, bio, achievements, profileImage } = req.body;
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
            if (!batch || typeof batch !== "string") {
                res.status(200).json({ success: false, message: "Batch is required" });
                return;
            }
            if (!company || typeof company !== "string") {
                res.status(200).json({ success: false, message: "Company is required" });
                return;
            }
            if (!designation || typeof designation !== "string") {
                res.status(200).json({ success: false, message: "Designation is required" });
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
            if (!achievements || typeof achievements !== "string") {
                res.status(200).json({ success: false, message: "Achievements are required" });
                return;
            }
            if (!profileImage || typeof profileImage !== "string") {
                res.status(200).json({ success: false, message: "Profileimage are required" });
                return;
            }
            const existingAlumni = yield Alumni_model_1.default.findOne({ email });
            if (existingAlumni) {
                res.status(200).json({ success: false, message: "Email already registered, please use other email to register" });
                return;
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newAlumni = new Alumni_model_1.default({
                name,
                email,
                password: hashedPassword,
                batch,
                company,
                designation,
                linkedin,
                bio,
                achievements,
                profileImage
            });
            yield newAlumni.save();
            res.status(201).json({ success: true, message: "Alumni registered successfully" });
            return;
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Server error" });
            return;
        }
    });
}
