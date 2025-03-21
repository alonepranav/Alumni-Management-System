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
exports.default = Alumni_Update_Profile;
const Alumni_model_1 = __importDefault(require("../../../../../../models/Alumni.model"));
function Alumni_Update_Profile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, name, batch, company, designation, linkedin, bio, achievements, profileImage } = req.body;
        if (!email) {
            res.status(200).json({ success: false, message: "Email is required" });
            return;
        }
        try {
            const updatedAlumni = yield Alumni_model_1.default.updateOne({ email }, { $set: { name, batch, company, designation, linkedin, bio, achievements, profileImage } }, { new: true });
            if (!updatedAlumni) {
                res.status(200).json({ success: false, message: "Alumni not found" });
                return;
            }
            res.status(200).json({ success: true, message: "Profile updated successfully" });
            return;
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    });
}
