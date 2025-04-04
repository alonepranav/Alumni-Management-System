import Student_Model from "../../../../../../models/Student.model";
import { Request, Response } from "express";


export default async function Student_GetData(req: Request, res: Response) {
    const { email } = req.query;

    if (!email) {
        res.status(200).json({ success: false, message: "Email is required" });
        return;
    }

    try {
        const user = await Student_Model.findOne({ email });
        if (!user) {
            res.status(200).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({ success: true, message: "Profile fetched successfully", user });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
