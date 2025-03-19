import Alumni from "../../../../../../models/Alumni.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export default async function Alumni_Verify(req: Request, res: Response) {
    try {
        const { token, email } = req.body;

        if (!token || !email) {
            res.status(200).json({ success: false, message: "Missing required fields." });
            return;
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const alumni = await Alumni.findOne({ email });

        if (!alumni) {
            res.status(200).json({ success: false, message: "User not found" });
            return;
        }

        const newToken = jwt.sign(
            { id: alumni._id, email: alumni.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            token: newToken,
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
        res.status(500).json({ success: false, message: "Invalid or expired token" });
        return;
    }
}
