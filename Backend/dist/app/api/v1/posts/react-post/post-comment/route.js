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
exports.default = Post_Comment;
const Post_model_1 = __importDefault(require("../../../../../../models/Post.model"));
function Post_Comment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postId, text, userId } = req.body;
        if (!postId || !text || !userId) {
            res.status(200).json({ success: false, message: "Missing required fields." });
            return;
        }
        try {
            const post = yield Post_model_1.default.findById({ _id: postId });
            if (!post) {
                res.status(200).json({ success: false, message: "Post not found" });
                return;
            }
            yield Post_model_1.default.findByIdAndUpdate(postId, {
                $push: { comments: { user: userId, text } }
            });
            res.json({ success: true, message: "Comment added successfully" });
            return;
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
            return;
        }
    });
}
