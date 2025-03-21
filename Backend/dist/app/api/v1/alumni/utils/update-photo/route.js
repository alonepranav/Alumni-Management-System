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
exports.default = Admin_Update_Photo;
const Alumni_model_1 = __importDefault(require("../../../../../../models/Alumni.model"));
function Admin_Update_Photo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, photoURL } = req.body;
        if (!email || !photoURL) {
            res.status(200).json({ success: false, message: "Email and photo URL are required." });
            return;
        }
        try {
            const user = yield Alumni_model_1.default.updateOne({ email }, { $set: { profileImage: photoURL } }, { new: true });
            if (!user) {
                res.status(200).json({ success: false, message: "User not found" });
                return;
            }
            else {
                res.status(200).json({ success: true, message: "Profile photo updated successfully." });
                return;
            }
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    });
}
;
