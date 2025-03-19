import Alumni from "../../../../../../models/Alumni.model";
import { Request, Response } from "express";


export default async function Alumni_Update_Profile(req: Request, res: Response) {
    const { email, name, batch, company, designation, linkedin, bio, achievements, profileImage } = req.body;

    if (!email) {
        res.status(200).json({ success: false, message: "Email is required" });
        return;
    }

    try {
        const updatedAlumni = await Alumni.updateOne(
            { email },
            { $set: { name, batch, company, designation, linkedin, bio, achievements, profileImage } },
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