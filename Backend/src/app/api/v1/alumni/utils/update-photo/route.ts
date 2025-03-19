
import { Request, Response } from 'express';
import Alumni from '../../../../../../models/Alumni.model';


export default async function Admin_Update_Photo(req: Request, res: Response) {
    const { email, photoURL } = req.body;

    if (!email || !photoURL) {
        res.status(200).json({ success: false, message: "Email and photo URL are required." });
        return;
    }

    try {
        const user = await Alumni.updateOne(
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