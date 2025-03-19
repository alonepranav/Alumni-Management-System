import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { appStorage } from "../../../firebase/firebase";
import GetImageId from "../../../functions/GetImageId";
import Routes from "../../../constants/Routes";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useAlumni } from "../../../context/AlumniContext";
import { useStudent } from "../../../context/StudentContext";
import Loader from "../../../components/Loader";


export default function Create_Post() {
    const { alumni } = useAlumni();
    const { student } = useStudent();

    if (!alumni && !student) return <></>;

    const [formData, setFormData] = useState({ author: "student", title: "", content: "" });
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let postData: any = {
                ...formData,
                author: student ? "student" : "alumni",
                user: student ? student.id : alumni ? alumni.id : "none",
                time: new Date().toString()
            };
            let imageUrl = "";

            if (image) {
                const storageRef = ref(appStorage, `ams/${GetImageId()}`);
                await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(storageRef);
                postData.imageId = imageUrl;
            }
            const res = await axios.post(Routes.Create_Post(), postData);

            if (res.data.success) {
                toast.success(res.data.message)
                setFormData({ author: "student", title: "", content: "" });
                setImage(null);
            }
            else {
                toast.error(res.data.message)
            }
        }
        catch (err) {
            toast.error("Something went wrong.")
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen py-20 w-screen">
            <div className="relative w-[40rem] border border-slate-300 mx-auto mt-10 p-8 pb-10 bg-white shadow-lg rounded-3xl">
                {
                    loading ? <div className="absolute z-20 h-full w-full flex justify-center items-center bg-black/35 rounded-3xl top-0 left-0">
                        <Loader color="white" />
                    </div> : null
                }
                <h2 className="text-2xl font-semibold text-center mb-10">Create a New Post</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block font-medium">Post Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter post title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-2 border border-slate-400 rounded-lg"
                    />

                    <label className="block font-medium">Content</label>
                    <textarea
                        name="content"
                        placeholder="Write your post..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full p-2 border border-slate-400 rounded-lg"
                        rows={4}
                    ></textarea>

                    <label className="block font-medium">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-slate-400 rounded-lg"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4"
                        disabled={loading}
                    >
                        {loading ? "Posting..." : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}
