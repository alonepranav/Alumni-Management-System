import { Request, Response } from "express";
import Post_Model from "../../../../../../models/Post.model";


export default async function Get_User_Posts(req: Request, res: Response) {
    const { email } = req.params;

    if (!email) {
        res.status(200).json({ success: false, message: "Missing required fields." });
        return
    }

    try {
        const posts = await Post_Model.find({ user: email });

        res.json({ success: true, message: "User Posts fetched successfully", posts });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
}