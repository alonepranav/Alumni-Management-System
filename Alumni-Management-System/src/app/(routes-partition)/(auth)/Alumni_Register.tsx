import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { appStorage, auth } from "../../../firebase/firebase";
import { ChangeEvent, FormEvent, useState } from "react";
import GetImageId from "../../../functions/GetImageId";
import Loader from "../../../components/Loader";
import Routes from "../../../constants/Routes";
import toast from "react-hot-toast";
import axios from "axios";

const Alumni_Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        batch: "",
        company: "",
        designation: "",
        linkedin: "",
        bio: "",
        achievements: "",
        profileImage: null as File | null
    });

    const [imageBlob, setImageBlob] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const blobUrl = URL.createObjectURL(file);
            setImageBlob(blobUrl);
            setFormData({ ...formData, profileImage: file });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.profileImage) return;
        setLoading(true);

        try {
            const googleProvider = new GoogleAuthProvider();
            const gRes = await signInWithPopup(auth, googleProvider);
            if (!gRes.user.email) return;

            const storageRef = ref(appStorage, `ams/${GetImageId()}`);
            await uploadBytes(storageRef, formData.profileImage);
            const downloadURL = await getDownloadURL(storageRef);

            const res = await axios.post(Routes.Alumni_Regsiter(), {
                ...formData,
                email: gRes.user.email,
                profileImage: downloadURL
            });

            if (res.data.success) {
                setFormData({
                    name: "",
                    password: "",
                    batch: "",
                    company: "",
                    designation: "",
                    linkedin: "",
                    bio: "",
                    achievements: "",
                    profileImage: null
                });
                setImageBlob(null);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.error("Registration failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-20 px-2">
            <div className="w-full md:w-[40rem] mx-auto mt-10 px-6 py-8 border border-slate-200 bg-white shadow-lg shadow-slate-300 rounded-xl relative">
                <h2 className="text-2xl font-bold mb-4 text-center pb-5">Alumni Registration</h2>
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
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="w-full p-2 border border-slate-400 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Profile Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border border-slate-400 rounded-md" required />
                        {imageBlob && <img src={imageBlob} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />}
                    </div>
                    <div>
                        <label className="block text-gray-700">Batch</label>
                        <input type="text" name="batch" value={formData.batch} onChange={handleChange} placeholder="Enter your batch" className="w-full p-2 border border-slate-400 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Company</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Enter your company name" className="w-full p-2 border border-slate-400 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Designation</label>
                        <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Enter your designation" className="w-full p-2 border border-slate-400 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">LinkedIn</label>
                        <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="Enter your LinkedIn profile URL" className="w-full p-2 border border-slate-400 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Bio</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Write a short bio about yourself" className="w-full p-2 border border-slate-400 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Achievements</label>
                        <textarea name="achievements" value={formData.achievements} onChange={handleChange} placeholder="List your achievements" className="w-full p-2 border border-slate-400 rounded-md" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Alumni_Register;