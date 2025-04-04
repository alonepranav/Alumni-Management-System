import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { appStorage, auth } from "../../../firebase/firebase";
import GetImageId from "../../../functions/GetImageId";
import Loader from "../../../components/Loader";
import Routes from "../../../constants/Routes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { AuthSection_Type } from "../../../Auth_Layout";


export default function Student_Register() {
    const [formData, setFormData] = useState<{
        name: string, email: string, password: string, profileImage: null | File,
        batch: string, linkedin: string, bio: string, interests: string,
    }>({
        name: "", email: "", password: "", profileImage: null,
        batch: "", linkedin: "", bio: "", interests: "",
    });

    const navigate = useNavigate();
    const [imageBlob, setImageBlob] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];


        if (file) {
            const blobUrl = URL.createObjectURL(file);
            setImageBlob(blobUrl);
            setFormData({ ...formData, profileImage: file });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        loginWithGoogle();
    };

    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        if (!formData.profileImage) return;

        try {
            setLoading(true);
            const res = await signInWithPopup(auth, googleProvider);

            if (!res.user.email) return;

            const storageRef = ref(appStorage, `ams/${GetImageId()}`);
            await uploadBytes(storageRef, formData.profileImage);
            const downloadURL = await getDownloadURL(storageRef);

            const re = await axios.post(Routes.Student_Regsiter(), {
                bio: formData.bio,
                name: formData.name,
                email: res.user.email,
                batch: formData.batch,
                profileImage: downloadURL,
                linkedin: formData.linkedin,
                password: formData.password,
                interests: formData.interests
            });

            if (re.data.success) {
                toast.success(re.data.message);
                navigate("/");
            } else {
                toast.error(re.data.message);
            }
        } catch (err) { }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center pb-28 pt-24 px-2">
            <form onSubmit={handleSubmit} className="relative w-full md:w-[40rem] mx-auto p-5 md:p-8 border border-slate-200 rounded-2xl shadow-xl shadow-slate-300">
                <p className="text-center font-semibold text-3xl mb-5">Student Register</p>
                {
                    loading ? <div className="absolute z-20 h-full w-full flex justify-center items-center bg-black/35 rounded-3xl top-0 left-0">
                        <Loader color="white" />
                    </div> : null
                }
                <div className="mb-3">
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="w-full p-2 border border-slate-300 rounded-md"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block font-semibold">Password</label>
                    <input
                        type="password" name="password"
                        placeholder="Enter a strong password"
                        className="w-full p-2 border border-slate-300 rounded-md"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block font-semibold">Profile Image</label>
                    <input
                        type="file" accept="image/*"
                        className="w-full p-2 border border-slate-300 rounded-md"
                        onChange={handleImageChange}
                        required
                    />
                    {imageBlob && <img src={imageBlob} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold">Batch</label>
                    <input
                        type="text"
                        name="batch"
                        placeholder="Enter your batch (e.g., 2024-2026)"
                        className="w-full p-2 border border-slate-300 rounded-md"
                        value={formData.batch}
                        onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block font-semibold">LinkedIn</label>
                    <input
                        type="text"
                        name="linkedin"
                        placeholder="Enter your LinkedIn profile URL"
                        className="w-full p-2 border border-slate-300 rounded-md"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block font-semibold">Bio</label>
                    <textarea
                        name="bio"
                        placeholder="Tell us about yourself"
                        className="w-full p-2 border border-slate-300 rounded-md"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block font-semibold">Interests (comma-separated)</label>
                    <input
                        type="text"
                        name="interests"
                        placeholder="e.g., Coding, Design, AI"
                        className="w-full p-2 border border-slate-300 rounded-md"
                        value={formData.interests}
                        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-5 rounded">Register</button>
            </form>
        </div>
    );
}
