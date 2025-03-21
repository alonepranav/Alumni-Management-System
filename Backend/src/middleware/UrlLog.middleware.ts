import { NextFunction, Request, Response } from "express";


export default function UrlLog_middleware(req: Request, res: Response, next: NextFunction) {
    next();
    return;
}
