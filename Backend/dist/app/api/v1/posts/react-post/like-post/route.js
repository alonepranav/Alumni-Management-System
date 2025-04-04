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
exports.default = Like_Post;
const Post_model_1 = __importDefault(require("../../../../../../models/Post.model"));
function Like_Post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, id } = req.body;
        if (!id || !email) {
            res.status(200).json({ success: false, message: "Invalid post ID or email" });
            return;
        }
        try {
            const post = yield Post_model_1.default.findById(id);
            if (!post) {
                res.status(200).json({ success: false, message: "Post not found" });
                return;
            }
            yield Post_model_1.default.findByIdAndUpdate(id, { $addToSet: { likes: email } });
            res.json({ success: true, message: "Post liked successfully." });
            return;
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
            return;
        }
    });
}
