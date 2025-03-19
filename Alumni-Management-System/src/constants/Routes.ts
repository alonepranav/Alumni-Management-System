import { BACKEND } from "./constants";

const Routes = {
    Student_Regsiter: () => BACKEND + "/api/v1/auth/student/register",
    Student_Verify: () => BACKEND + "/api/v1/auth/student/verify",
    Student_Login: () => BACKEND + "/api/v1/auth/student/login",
    Student_Login_Google: () => BACKEND + "/api/v1/auth/student/login/google",
    Student_Update_Photo: () => BACKEND + "/api/v1/student/utils/update-photo",
    Student_GetData: (email: string) => BACKEND + `/api/v1/student/utils/get-data/${email}`,
    Student_Update_Profile: () => BACKEND + "/api/v1/student/utils/update-profile",

    Alumni_Regsiter: () => BACKEND + "/api/v1/auth/alumni/register",
    Alumni_Verify: () => BACKEND + "/api/v1/auth/alumni/verify",
    Alumni_Login: () => BACKEND + "/api/v1/auth/alumni/login",
    Alumni_Login_Google: () => BACKEND + "/api/v1/auth/alumni/login/google",
    Alumni_Update_Photo: () => BACKEND + "/api/v1/alumni/utils/update-photo",
    Alumni_GetData: (email: string) => BACKEND + `/api/v1/alumni/utils/get-data/${email}`,
    Alumni_Update_Profile: () => BACKEND + "/api/v1/alumni/utils/update-profile",



    Get_Posts: () => BACKEND + '/api/v1/posts/get-posts',
    Get_User_Posts: (email: string) => BACKEND + `/api/v1/posts/get-posts/user/${email}`,
    Delete_Post: (id: string) => BACKEND + `/api/v1/posts/delete-post/${id}`,
    Like_Post: () => BACKEND + '/api/v1/posts/react-post/like-post',
    Dislike_Post: () => BACKEND + '/api/v1/posts/react-post/dislike-post',
    Create_Post: () => BACKEND + '/api/v1/posts/create-post',

}


export default Routes;