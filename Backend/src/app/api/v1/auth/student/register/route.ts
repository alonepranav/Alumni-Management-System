import Student_Model from "../../../../../../models/Student.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";


export default async function Student_Register(req: Request, res: Response) {

    try {
        const { name, email, password, profileImage, batch, linkedin, bio, interests } = req.body;

        if (!name || typeof name !== "string" || name.trim().length < 3) {
            res.status(200).json({ success: false, message: "Invalid name" });
            return;
        }

        if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
            res.status(200).json({ success: false, message: "Invalid email" });
            return;
        }

        if (!password || typeof password !== "string" || password.length < 6) {
            res.status(200).json({ success: false, message: "Password must be at least 6 characters long" });
            return;
        }

        if (!profileImage || typeof profileImage !== "string") {
            res.status(200).json({ success: false, message: "Invalid profile image URL" });
            return;
        }

        if (!batch || typeof batch !== "string") {
            res.status(200).json({ success: false, message: "Batch is required" });
            return;
        }

        if (!linkedin || typeof linkedin !== "string" || !linkedin.startsWith("https://")) {
            res.status(200).json({ success: false, message: "Invalid LinkedIn URL" });
            return;
        }

        if (!bio || typeof bio !== "string") {
            res.status(200).json({ success: false, message: "Bio must be at least 10 characters long" });
            return;
        }

        if (!interests || typeof interests !== "string" || interests.trim().length < 10) {
            res.status(200).json({ success: false, message: "Interests must be an array with at least one item" });
            return;
        }

        const existingUser = await Student_Model.findOne({ email });
        if (existingUser) {
            res.status(200).json({ success: false, message: "Email already registered, please use other email to register." });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student_Model({
            name,
            email,
            password: hashedPassword,
            profileImage,
            batch,
            linkedin,
            bio,
            interests
        });

        await newStudent.save();

        res.status(201).json({ success: true, message: "Student registered successfully" });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
        return;
    }
};
