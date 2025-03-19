import Post_Model from "../../../../../../models/Post.model";
import { Request, Response } from "express";
 

export default async function Like_Post(req: Request, res: Response) {
    const { email, id } = req.body;

    if (!id || !email) {
        res.status(200).json({ success: false, message: "Invalid post ID or email" });
        return;
    }

    try {
        const post = await Post_Model.findById(id);

        if (!post) {
            res.status(200).json({ success: false, message: "Post not found" });
            return;
        }

        await Post_Model.findByIdAndUpdate(id, { $addToSet: { likes: email } });

        res.json({ success: true, message: "Post liked successfully." });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
}
