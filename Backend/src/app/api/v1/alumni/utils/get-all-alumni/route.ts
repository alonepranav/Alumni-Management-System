import Alumni from "../../../../../../models/Alumni.model";
import { Request, Response } from "express";


export default async function Admin_Get_All_Alumni(req: Request, res: Response) {

    try {
        const users = await Alumni.find({});

        if (!users) {
            res.status(200).json({ success: false, message: "No data present." });
            return;
        }

        res.status(200).json({ success: true, message: "Profile fetched successfully", users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
