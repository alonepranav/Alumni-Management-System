import { APP_ADMINS, APP_JWT_SECRET } from "../../../../../../constants";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export default function Admin_Login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(200).json({ success: false, message: "Missing required fields." });
        return
    }
    try {
        const admin = APP_ADMINS.find(a => a.email === email && a.password === password);

        if (admin) {
            const token = jwt.sign({ email: admin.email }, APP_JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ success: true, message: "Login successful.", token, ...admin });
        } else {
            res.status(200).json({ success: false, message: "Invalid credentials." });
        }
        return
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong." });
        return
    }
}
