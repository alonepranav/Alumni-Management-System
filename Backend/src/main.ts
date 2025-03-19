
import Student_Register from './app/api/v1/auth/student/register/route';
import Student_Verify from './app/api/v1/auth/student/verify/route';
import Student_Login from './app/api/v1/auth/student/login/route';
import express from 'express';
import Home from './app';
import Student_Login_Google from './app/api/v1/auth/student/login/google/route';
import Alumni_Register from './app/api/v1/auth/alumni/register/route';
import Alumni_Login from './app/api/v1/auth/alumni/login/route';
import Alumni_Login_Google from './app/api/v1/auth/alumni/login/google/route';
import Alumni_Verify from './app/api/v1/auth/alumni/verify/route';
import Admin_Update_Photo from './app/api/v1/alumni/utils/update-photo/route';
import Admin_GetData from './app/api/v1/alumni/utils/get-data/route';
import Alumni_Update_Profile from './app/api/v1/alumni/utils/update-profile/route';
import Get_Posts from './app/api/v1/posts/get-posts/route';
import Get_User_Posts from './app/api/v1/posts/get-posts/user/route';
import Delete_Post from './app/api/v1/posts/delete-post/route';
import Like_Post from './app/api/v1/posts/react-post/like-post/route';
import Dislike_Post from './app/api/v1/posts/react-post/dislike-post/route';
import Create_Post from './app/api/v1/posts/create-post/route';

const Routes = express.Router();

Routes.get('/', Home);

// Student
Routes.post('/api/v1/auth/student/register', Student_Register);
Routes.post('/api/v1/auth/student/login', Student_Login);
Routes.post('/api/v1/auth/student/login/google', Student_Login_Google);
Routes.post('/api/v1/auth/student/verify', Student_Verify);

// Alumni
Routes.post('/api/v1/auth/alumni/register', Alumni_Register);
Routes.post('/api/v1/auth/alumni/login', Alumni_Login);
Routes.post('/api/v1/auth/alumni/login/google', Alumni_Login_Google);
Routes.post('/api/v1/auth/alumni/verify', Alumni_Verify);

// Alumni - Utils
Routes.post('/api/v1/alumni/utils/update-photo', Admin_Update_Photo);
Routes.get('/api/v1/alumni/utils/get-data/:email', Admin_GetData);
Routes.patch('/api/v1/alumni/utils/update-profile', Alumni_Update_Profile);

// Posts
Routes.get('/api/v1/posts/get-posts', Get_Posts);
Routes.get('/api/v1/posts/get-posts/user/:email', Get_User_Posts);
Routes.delete('/api/v1/posts/delete-post/:id', Delete_Post);
Routes.patch('/api/v1/posts/react-post/like-post', Like_Post);
Routes.patch('/api/v1/posts/react-post/dislike-post', Dislike_Post);
Routes.post('/api/v1/posts/create-post', Create_Post);



// Operations 
export default Routes;