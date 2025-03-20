import { useStudent } from "../../context/StudentContext";
import { useAlumni } from "../../context/AlumniContext";
import PostType from "../../types/Post.types";
import Loader from "../../components/Loader";
import Routes from "../../constants/Routes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


export default function Posts() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setloading] = useState(true);
    const { student } = useStudent();
    const { alumni } = useAlumni();

    const GetPosts = async () => {
        try {
            const res = await axios.get(Routes.Get_Posts());

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

    useEffect(() => {
        GetPosts();
    }, [])

    return (
        <div className="pt-20 px-80 min-h-screen">
            {
                (student || alumni) ?
                    <div className="flex justify-end gap-6">
                        <Link to={"/posts/my-posts"} >
                            <button className="bg-emerald-400 hover:bg-emerald-500 cursor-pointer text-white font-semibold px-6 py-2 rounded-md">See my Posts</button>

                        </Link>
                        <Link to={"/posts/create-post"} >
                            <button className="bg-amber-400 hover:bg-amber-500 cursor-pointer text-white font-semibold px-6 py-2 rounded-md">Create new Post</button>
                        </Link>
                    </div>
                    : null
            }
            <div className="flex justify-center items-center w-full pb-24 pt-6">
                <div className="relative w-full h-full">
                    {loading ? <div className="h-full w-full flex justify-center items-center"><Loader color="black" /></div> : null}

                    {
                        posts.map((a, i) => <SinglePost_Component key={i} data={a} />)
                    }
                </div>
            </div>
        </div>
    )
}

const SinglePost_Component = ({ data }: { data: PostType }) => {

    return <div className="px-5 py-3 border border-slate-200 rounded-lg mb-4">
        <div className="flex gap-2 items-center mb-3">
            <p className="capitalize text-white bg-slate-800 rounded-full w-fit px-3 py-1 text-xs">{data.author}</p>
            <p className="text-sm">/  {new Date(data.time).toLocaleDateString()}</p>
        </div>
        <p className="text-xl font-semibold">{data.title}</p>

        {data.imageId == "none" ? null :
            <div className="mt-3 flex justify-center w-full bg-slate-50 rounded-xl p-2">
                <img src={data.imageId} className="h-80" />
            </div>
        }
        <p className="mt-3">{data.content}</p>
    </div>
}