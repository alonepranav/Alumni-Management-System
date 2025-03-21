import Alumni from "../../../../../../models/Alumni.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";


export default async function Alumni_Register(req: Request, res: Response) {
    try {
        const { name, email, password, batch, company, designation, linkedin, bio, achievements, profileImage } = req.body;

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

        if (!batch || typeof batch !== "string") {
            res.status(200).json({ success: false, message: "Batch is required" });
            return;
        }

        if (!company || typeof company !== "string") {
            res.status(200).json({ success: false, message: "Company is required" });
            return;
        }

        if (!designation || typeof designation !== "string") {
            res.status(200).json({ success: false, message: "Designation is required" });
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

        if (!achievements || typeof achievements !== "string") {
            res.status(200).json({ success: false, message: "Achievements are required" });
            return;
        }

        if (!profileImage || typeof profileImage !== "string") {
            res.status(200).json({ success: false, message: "Profileimage are required" });
            return;
        }

        const existingAlumni = await Alumni.findOne({ email });
        if (existingAlumni) {
            res.status(200).json({ success: false, message: "Email already registered, please use other email to register" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAlumni = new Alumni({
            name,
            email,
            password: hashedPassword,
            batch,
            company,
            designation,
            linkedin,
            bio,
            achievements,
            profileImage
        });

        await newAlumni.save();

        res.status(201).json({ success: true, message: "Alumni registered successfully" });
        return;
    } catch (error) { 
        res.status(500).json({ success: false, message: "Server error" });
        return;
    }
}
