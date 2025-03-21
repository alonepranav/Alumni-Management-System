"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const constants_1 = require("../constants");
function Home(req, res) {
    const serverInfo = {
        success: true,
        message: "Home route.",
        app_name: constants_1.APP_NAME,
        server: {
            name: constants_1.APP_NAME + " - Admin Backend Server.",
            version: constants_1.APP_VERSION,
        },
        developer: "https://instagram.com/pranavshilavane",
        timestamp: new Date().toDateString(),
    };
    res.status(200).json(serverInfo);
    return;
}
