"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ConnectDB_1 = __importDefault(require("./database/ConnectDB"));
(0, ConnectDB_1.default)();
const app = (0, express_1.default)();
const main_1 = __importDefault(require("./main"));
// Middlewares
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// All Routes
app.use(main_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.clear();
    console.log(`Admin Server - http://localhost:${PORT}`);
});
