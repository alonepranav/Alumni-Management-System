"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_NAME = exports.APP_ADMINS = exports.APP_VERSION = exports.COMPANY_NAME = exports.APP_JWT_SECRET = exports.APP_ALLOWED_TEAMS = exports.APP_MONGODB_STRING = exports.APP_ADMIN_TOKEN_EXPIRY_TIME = void 0;
const APP_MONGODB_STRING = process.env.APP_MONGODB_STRING;
exports.APP_MONGODB_STRING = APP_MONGODB_STRING;
const APP_NAME = process.env.APP_NAME;
exports.APP_NAME = APP_NAME;
const APP_VERSION = process.env.APP_VERSION;
exports.APP_VERSION = APP_VERSION;
const APP_JWT_SECRET = process.env.APP_JWT_SECRET;
exports.APP_JWT_SECRET = APP_JWT_SECRET;
const COMPANY_NAME = process.env.COMPANY_NAME;
exports.COMPANY_NAME = COMPANY_NAME;
const APP_ADMIN_TOKEN_EXPIRY_TIME = process.env.APP_ADMIN_TOKEN_EXPIRY_TIME;
exports.APP_ADMIN_TOKEN_EXPIRY_TIME = APP_ADMIN_TOKEN_EXPIRY_TIME;
const APP_ALLOWED_TEAMS = ["@gmail.com"];
exports.APP_ALLOWED_TEAMS = APP_ALLOWED_TEAMS;
const APP_ADMINS = [
    {
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
    }
];
exports.APP_ADMINS = APP_ADMINS;
