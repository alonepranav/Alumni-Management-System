import Post_Model from "../../../../../models/Post.model";
import { Request, Response } from "express";


export default async function Create_Post(req: Request, res: Response) {
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
        const newPost = new Post_Model({
            user,
            time,
            title,
            author,
            content,
            likes: [],
            comments: [],
            imageId: typeof imageId == "string" ? imageId : "none",
        });

        await newPost.save();

        res.json({ success: true, message: "Post created successfully" });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
}
