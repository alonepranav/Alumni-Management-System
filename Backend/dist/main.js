"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("./app/api/v1/auth/student/register/route"));
const route_2 = __importDefault(require("./app/api/v1/auth/student/verify/route"));
const route_3 = __importDefault(require("./app/api/v1/auth/student/login/route"));
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app"));
const route_4 = __importDefault(require("./app/api/v1/auth/student/login/google/route"));
const route_5 = __importDefault(require("./app/api/v1/auth/alumni/register/route"));
const route_6 = __importDefault(require("./app/api/v1/auth/alumni/login/route"));
const route_7 = __importDefault(require("./app/api/v1/auth/alumni/login/google/route"));
const route_8 = __importDefault(require("./app/api/v1/auth/alumni/verify/route"));
const route_9 = __importDefault(require("./app/api/v1/alumni/utils/update-photo/route"));
const route_10 = __importDefault(require("./app/api/v1/alumni/utils/get-data/route"));
const route_11 = __importDefault(require("./app/api/v1/alumni/utils/update-profile/route"));
const route_12 = __importDefault(require("./app/api/v1/posts/get-posts/route"));
const route_13 = __importDefault(require("./app/api/v1/posts/get-posts/user/route"));
const route_14 = __importDefault(require("./app/api/v1/posts/delete-post/route"));
const route_15 = __importDefault(require("./app/api/v1/posts/react-post/like-post/route"));
const route_16 = __importDefault(require("./app/api/v1/posts/react-post/dislike-post/route"));
const route_17 = __importDefault(require("./app/api/v1/posts/create-post/route"));
const route_18 = __importDefault(require("./app/api/v1/auth/admin/login/route"));
const Routes = express_1.default.Router();
Routes.get('/', app_1.default);
// Student
Routes.post('/api/v1/auth/student/register', route_1.default);
Routes.post('/api/v1/auth/student/login', route_3.default);
Routes.post('/api/v1/auth/student/login/google', route_4.default);
Routes.post('/api/v1/auth/student/verify', route_2.default);
// Alumni
Routes.post('/api/v1/auth/alumni/register', route_5.default);
Routes.post('/api/v1/auth/alumni/login', route_6.default);
Routes.post('/api/v1/auth/alumni/login/google', route_7.default);
Routes.post('/api/v1/auth/alumni/verify', route_8.default);
// Admin
Routes.post('/api/v1/auth/admin/login', route_18.default);
// Alumni - Utils
Routes.post('/api/v1/alumni/utils/update-photo', route_9.default);
Routes.get('/api/v1/alumni/utils/get-data/:email', route_10.default);
Routes.patch('/api/v1/alumni/utils/update-profile', route_11.default);
// Posts
Routes.get('/api/v1/posts/get-posts', route_12.default);
Routes.get('/api/v1/posts/get-posts/user/:email', route_13.default);
Routes.delete('/api/v1/posts/delete-post/:id', route_14.default);
Routes.patch('/api/v1/posts/react-post/like-post', route_15.default);
Routes.patch('/api/v1/posts/react-post/dislike-post', route_16.default);
Routes.post('/api/v1/posts/create-post', route_17.default);
// Operations 
exports.default = Routes;
