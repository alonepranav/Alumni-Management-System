import Student_Model from "../../../../../../models/Student.model";
import { Request, Response } from "express";


export default async function Student_Update_Profile(req: Request, res: Response) {
    const { email, name, batch, linkedin, bio, interests } = req.body;

    if (!email) {
        res.status(200).json({ success: false, message: "Email is required" });
        return;
    }

    try {
        const updatedAlumni = await Student_Model.updateOne(
            { email },
            { $set: { name, batch, linkedin, bio, interests } },
            { new: true }
        );

        if (!updatedAlumni) {
            res.status(200).json({ success: false, message: "Alumni not found" });
            return;
        }

        res.status(200).json({ success: true, message: "Profile updated successfully" });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}