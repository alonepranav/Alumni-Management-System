import Post_Model from "../../../../../models/Post.model";
import { Request, Response } from "express";


export default async function Delete_Post(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
        res.status(200).json({ success: false, message: "Invalid post ID" });
        return
    }

    try {
        const deletedPost = await Post_Model.deleteOne({ _id: id });
        if (!deletedPost) {
            res.status(200).json({ success: false, message: "Post not found" });
            return;
        }

        res.json({ success: true, message: "Post deleted successfully" });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
}