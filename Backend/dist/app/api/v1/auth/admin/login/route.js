"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Admin_Login;
const constants_1 = require("../../../../../../constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function Admin_Login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(200).json({ success: false, message: "Missing required fields." });
        return;
    }
    try {
        const admin = constants_1.APP_ADMINS.find(a => a.email === email && a.password === password);
        if (admin) {
            const token = jsonwebtoken_1.default.sign({ email: admin.email }, constants_1.APP_JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json(Object.assign({ success: true, message: "Login successful.", token }, admin));
        }
        else {
            res.status(200).json({ success: false, message: "Invalid credentials." });
        }
        return;
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong." });
        return;
    }
}
