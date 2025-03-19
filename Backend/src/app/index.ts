import { APP_NAME, APP_VERSION } from "../constants";
import { Request, Response } from "express";


export default function Home(req: Request, res: Response) {
    const serverInfo = {
        success: true,
        message: "Home route.",
        app_name: APP_NAME,
        server: {
            name: APP_NAME + " - Admin Backend Server.",
            version: APP_VERSION,
        },
        developer: "https://instagram.com/pranavshilavane",
        timestamp: new Date().toDateString(),
    };

    res.status(200).json(serverInfo);
    return;
}
