import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAlumni } from "../../../../../context/AlumniContext";
import Loader from "../../../../../components/Loader";
import Routes from "../../../../../constants/Routes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useStudent } from "../../../../../context/StudentContext";


const Student_EditProfile = () => {
    const { student } = useStudent();
    if (!student) return <></>;

    const [formData, setFormData] = useState({
        bio: "",
        name: "",
        batch: "",
        linkedin: "",
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(Routes.Student_GetData(student.email));
            if (res.data.success) {
                setFormData({ ...res.data.user });
                setLoading(false);
            }
        };

        setFormData({
            name: student.name,
            batch: student.batch,
            linkedin: student.linkedin,
            bio: student.bio
        });
        setLoading(false);

        // getData();
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await axios.patch(Routes.Student_Update_Profile(), {
                email: student.email, ...formData
            });

            if (res.data.success) {
                toast.success(res.data.message);
                window.location.replace("/user/profile/student")
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.error("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-20">
            <div className="w-[40rem] mx-auto mt-10 px-6 py-8 border border-slate-200 bg-white shadow-lg shadow-slate-300 rounded-xl relative">
                <h2 className="text-2xl font-bold mb-4 text-center pb-5">Student - Edit Profile Data</h2>
                {loading && (
                    <div className="absolute z-20 h-full w-full flex justify-center items-center bg-black/35 rounded-xl top-0 left-0">
                        <Loader color="white" />
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full p-2 border border-slate-400 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Batch</label>
                        <input type="text" name="batch" value={formData.batch} onChange={handleChange} placeholder="Enter your batch" className="w-full p-2 border border-slate-400 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">LinkedIn</label>
                        <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="Enter your LinkedIn profile URL" className="w-full p-2 border border-slate-400 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Bio</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Write a short bio about yourself" className="w-full p-2 border border-slate-400 rounded-md" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Student_EditProfile;