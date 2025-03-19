import Alumni from "../../../../../../../models/Alumni.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export default async function Alumni_Login_Google(req: Request, res: Response) {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(200).json({ success: false, message: "Email is required." });
            return;
        }

        const alumni = await Alumni.findOne({ email });
        if (!alumni) {
            res.status(200).json({ success: false, message: "Account not found" });
            return;
        }

        const token = jwt.sign(
            { id: alumni._id, email: alumni.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: alumni._id,
                name: alumni.name,
                email: alumni.email,
                batch: alumni.batch,
                company: alumni.company,
                designation: alumni.designation,
                linkedin: alumni.linkedin,
                bio: alumni.bio,
                achievements: alumni.achievements,
                profileImage: alumni.profileImage
            }
        });
        return;

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
        return;
    }
}
