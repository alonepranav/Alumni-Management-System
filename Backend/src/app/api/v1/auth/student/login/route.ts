import Student_Model from "../../../../../../models/Student.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function Student_Login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(200).json({ success: false, message: "Email and password are required." });
            return;
        }

        const student = await Student_Model.findOne({ email });
        if (!student) {
            res.status(200).json({ success: false, message: "Account not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            res.status(200).json({ success: false, message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({
            id: student._id, email: student.email
        }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
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
        res.status(500).json({ success: false, message: "Server error" });
        return;
    }
};
