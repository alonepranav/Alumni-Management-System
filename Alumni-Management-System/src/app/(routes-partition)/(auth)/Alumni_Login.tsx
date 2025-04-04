import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAlumni } from "../../../context/AlumniContext";
import { auth } from "../../../firebase/firebase";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import Routes from "../../../constants/Routes";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function Alumni_Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { setAlumni } = useAlumni();

    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            const res = await signInWithPopup(auth, googleProvider);

            const re = await axios.post(Routes.Student_Login_Google(), {
                email: res.user.email,
            });

            if (re.data.success) {
                localStorage.clear();
                localStorage.setItem(
                    "alumni",
                    JSON.stringify({
                        token: re.data.token,
                        email: res.user.email,
                        name: re.data.user.name,
                        image: re.data.user.profileImage
                    })
                );

                setAlumni({
                    ...re.data.user,
                    token: re.data.token
                });
                toast.success(re.data.message);
                navigate("/")
            } else {
                toast.error(re.data.message);
            }
        } catch (err) { }
        finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const re = await axios.post(Routes.Alumni_Login(), {
                email: formData.email, password: formData.password
            });
            if (re.data.success) {
                localStorage.setItem(
                    "alumni",
                    JSON.stringify({
                        token: re.data.token,
                        email: formData.email,
                        name: re.data.user.name,
                        image: re.data.user.profileImage
                    })
                );
                setAlumni({ ...re.data.user, token: re.data.token });
                toast.success(re.data.message);
                navigate("/")
            }
            else {
                toast.error(re.data.message);
            }
        } catch (error) {
            toast.error("Somethig went wrong.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <div className="flex justify-center items-center flex-grow ">
                <div className="bg-gradient-to-b from-rose-500 via-orange-500 to-amber-400 p-2 rounded-2xl shadow-xl shadow-slate-300">
                    <div className="relative border border-slate-200 rounded-xl p-8 w-full md:w-[40rem] bg-white">
                        {
                            loading ? <div className="absolute left-0 z-20 h-full w-full flex justify-center items-center bg-black/35 rounded-xl top-0">
                                <Loader color="white" />
                            </div> : null
                        }
                        <h2 className="text-2xl font-bold mb-6">Alumni Login</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full border-b border-gray-300 outline-none py-2"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full border-b border-gray-300 outline-none py-2"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`mt-5 w-full bg-blue-500 text-white py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            <p className="text-sm text-center mt-4">
                                Don't have an account?{" "}
                                <a href="?page=alumni-signin" className="text-blue-500 hover:underline">
                                    Create an account
                                </a>
                            </p>
                        </form>

                        <div className="flex items-center my-6">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="px-4 text-sm text-gray-500">Or</span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        <button onClick={loginWithGoogle} className="w-full flex items-center justify-center gap-2 border border-slate-300 py-2 rounded-full hover:bg-gray-50">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG5FqrS9OkN5XrA5_GXcN7OV-SoLIl0KPwoQ&s"
                                alt="Google" className="h-5" />
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
