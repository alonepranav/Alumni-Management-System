import axios from "axios";
import { useEffect, useState } from "react"
import Routes from "../../../constants/Routes";
import { useAlumni } from "../../../context/AlumniContext";
import { useStudent } from "../../../context/StudentContext";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";

type PostType = {
    author: "student" | "alumni";
    title: string;
    user: string;
    content: string;
    likes: string[];
    comments: [{ user: string; text: string; }],
    time: string;
    imageId: string;
}

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
                toast.success(res.data.message);
            }
            else {
                toast.error(res.data.message);
                setloading(false);
            }
        } catch (error) { }
        finally { }
    }

    useEffect(() => {
        GetPosts();
    }, [])

    return (
        <div className="flex justify-center items-center min-h-screen w-screen py-24 px-[30rem]">
            <div className="relative w-full h-full">
                {loading ? <div className="h-full w-full flex justify-center items-center"><Loader color="black" /></div> : null}

                {
                    posts.map((a) => {
                        return <div className="px-5 py-3 border border-slate-200 rounded-lg mb-4">
                            <p className="text-xl font-semibold">{a.title} - {new Date(a.time).toLocaleDateString()}</p>

                            {a.imageId == "none" ? null :
                                <div className="mt-3 flex justify-center w-full bg-slate-50 rounded-xl p-2">
                                    <img src={a.imageId} className="h-80" />
                                </div>
                            }
                            <p className="mt-3">{a.content}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
