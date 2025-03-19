import Student_Model from "../../../../../../models/Student.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function Student_Verify(req: Request, res: Response) {
    try {
        const { token, email } = req.body;

        if (!token || !email) {
            res.status(200).json({ success: false, message: "Missing required fields." });
            return;
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const student = await Student_Model.findOne({ email });

        if (!student) {
            res.status(200).json({ success: false, message: "User not found" });
            return;
        }

        const newToken = jwt.sign(
            { id: student._id, email: student.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            token: newToken,
            user: {
                id: student._id,
                name: student.name,
                email: student.email,
                profileImage: student.profileImage,
                batch: student.batch,
                linkedin: student.linkedin,
                bio: student.bio,
                interests: student.interests
            }
        });
        return;

    } catch (error) {
        res.status(500).json({ success: false, message: "Invalid or expired token" });
        return;
    }
};
