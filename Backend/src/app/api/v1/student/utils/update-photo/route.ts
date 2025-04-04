import Alumni from '../../../../../../models/Alumni.model';
import { Request, Response } from 'express';
import Student_Model from '../../../../../../models/Student.model';


export default async function Student_Update_Photo(req: Request, res: Response) {
    const { email, photoURL } = req.body;

    if (!email || !photoURL) {
        res.status(200).json({ success: false, message: "Email and photo URL are required." });
        return;
    }

    try {
        const user = await Student_Model.updateOne(
            { email },
            { $set: { profileImage: photoURL } },
            { new: true }
        );

        if (!user) {
            res.status(200).json({ success: false, message: "User not found" });
            return;
        } else {
            res.status(200).json({ success: true, message: "Profile photo updated successfully." });
            return;
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};