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
exports.default = Create_Post;
const Post_model_1 = __importDefault(require("../../../../../models/Post.model"));
function Create_Post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, author, title, content, time, imageId } = req.body;
        if (!user || !author || !title || !content || !time) {
            res.status(200).json({ success: false, message: "All fields are required" });
            return;
        }
        if (!["student", "alumni"].includes(author)) {
            res.status(200).json({ success: false, message: "Invalid author type" });
            return;
        }
        try {
            const newPost = new Post_model_1.default({
                user,
                time,
                title,
                author,
                content,
                likes: [],
                comments: [],
                imageId: typeof imageId == "string" ? imageId : "none",
            });
            yield newPost.save();
            res.json({ success: true, message: "Post created successfully" });
            return;
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
            return;
        }
    });
}
