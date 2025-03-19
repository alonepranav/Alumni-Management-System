import Post_Model from "../../../../../../models/Post.model";
import { Request, Response } from "express";


export default async function Post_Comment(req: Request, res: Response) {
    const { postId, text, userId } = req.body;

    if (!postId || !text || !userId) {
        res.status(200).json({ success: false, message: "Missing required fields." });
        return;
    }
f
    try {
        const post = await Post_Model.findById({ _id: postId });

        if (!post) {
            res.status(200).json({ success: false, message: "Post not found" });
            return;
        }

        await Post_Model.findByIdAndUpdate(postId, {
            $push: { comments: { user: userId, text } }
        });

        res.json({ success: true, message: "Comment added successfully" });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
}
