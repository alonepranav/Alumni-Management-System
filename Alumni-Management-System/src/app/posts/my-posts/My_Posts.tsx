import { useStudent } from "../../../context/StudentContext";
import { useAlumni } from "../../../context/AlumniContext";
import MyPostBox from "../../../components/MyPost_Box";
import PostType from "../../../types/Post.types";
import Loader from "../../../components/Loader";
import Routes from "../../../constants/Routes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";


export default function My_Posts() {
    const { alumni } = useAlumni();
    const { student } = useStudent();

    if (!alumni && !student) return <div className="h-full w-full flex justify-center items-center"><Loader color="black" /></div>;

    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setloading] = useState(true);

    const GetPosts = async () => {
        try {
            const res = await axios.get(Routes.Get_User_Posts(alumni ? alumni.id : student ? student.id : "none"));
            if (res.data.success) {
                setPosts(res.data.posts);
                setloading(false);
            }
            else {
                toast.error(res.data.message);
                setloading(false);
            }
        } catch (error) { }
    }

    const DeletePosts = async (id: string) => {
        try {
            const res = await axios.delete(Routes.Delete_Post(id));
            if (res.data.success) setPosts(posts.filter(a => a._id != id));
        } catch (error) { }
    }

    useEffect(() => {
        GetPosts();
    }, [])

    return (
        <div className="flex justify-center min-h-screen w-screen py-24 px-[30rem]">
            <div className="relative w-full h-full">
                {loading ? <div className="h-full w-full flex justify-center items-center"><Loader color="black" /></div> : null}

                <p className="font-semibold text-2xl p-2 bg-slate-50 border border-neutral-200 rounded-md mb-5 sticky z-10 top-20">My Posts</p>
                {
                    posts.length == 0 ? <div className="text-center font-semibold text-xl pt-10">No post present...</div> :
                        posts.map((a, i) => <MyPostBox {...{ data: a, DeletePosts }} key={i} />)
                }
            </div>
        </div>
    )
}