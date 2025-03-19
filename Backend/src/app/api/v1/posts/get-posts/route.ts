import Post_Model from "../../../../../models/Post.model";
import { Request, Response } from "express";


export default async function Get_Posts(req: Request, res: Response) {

    try {
        const posts = await Post_Model.find({});

        res.json({ success: true, message: "Post fetched successfully", posts });
        return;

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
}