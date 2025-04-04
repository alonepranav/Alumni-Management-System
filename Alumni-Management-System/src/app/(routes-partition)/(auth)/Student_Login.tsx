import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useStudent } from "../../../context/StudentContext";
import { Dispatch, SetStateAction, useState } from "react";
import { AuthSection_Type } from "../../../Auth_Layout";
import { auth } from "../../../firebase/firebase";
import Loader from "../../../components/Loader";
import Routes from "../../../constants/Routes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


export default function Student_Login() {

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setStudent } = useStudent();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const googleProvider = new GoogleAuthProvider();

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
                    "student",
                    JSON.stringify({
                        token: re.data.token,
                        email: res.user.email,
                        name: re.data.user.name,
                        image: re.data.user.profileImage
                    })
                );

                setStudent({
                    ...re.data.user,
                    token: re.data.token
                });
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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const re = await axios.post(Routes.Student_Login(), {
                email: formData.email, password: formData.password
            });
            if (re.data.success) {
                localStorage.setItem(
                    "student",
                    JSON.stringify({
                        token: re.data.token,
                        email: formData.email,
                        name: re.data.user.name,
                        image: re.data.user.profileImage
                    })
                );
                setStudent({
                    ...re.data.user,
                    token: re.data.token
                });
                toast.success("Login Successfull");
                navigate("/");
            }
            else {
                toast.error(re.data.message);
            }
        } catch (error) {
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 w-full md:w-[40rem] mx-auto">

                    <div className="bg-gradient-to-r from-teal-400 to-blue-400 shadow-lg rounded-2xl p-2">

                        <div className="relative p-10 bg-white shadow-lg border border-slate-200 rounded-2xl">
                            {
                                loading ? <div className="absolute z-20 h-full w-full flex justify-center items-center bg-white/85 rounded-2xl top-0 left-0">
                                    <Loader color="black" />
                                </div> : null
                            }
                            <div className="mx-auto">
                                <h1 className="text-2xl font-semibold">Login - Student</h1>
                                <form onSubmit={handleSubmit} className="divide-y divide-gray-200 mt-3">
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <input
                                                autoComplete="off"
                                                id="email"
                                                name="email"
                                                type="text"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                                                placeholder="Email address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="email"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                Email Address
                                            </label>
                                        </div>
                                        <div className="relative mt-7">
                                            <input
                                                autoComplete="off"
                                                id="password"
                                                name="password"
                                                type="password"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="password"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                Password
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input type="submit" value="Submit" className="cursor-pointer bg-cyan-500 text-white rounded-md px-2 py-1 w-full mt-4" />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="text-center text-sm ">
                                Dont have an account ? {" "} <a href="?page=student-signin" className="underline text-blue-500 cursor-pointer">Create New </a>
                            </div>

                            <div className="w-full flex justify-center mt-5">
                                <button onClick={loginWithGoogle} className="flex gap-2 justify-center items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 w-full text-center py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <img src="/google.png" className="h-7 w-7" />
                                    <span>Continue with Google</span>
                                </button>
                            </div>

                            <div className="mt-10">
                                <p className="text-center text-sm ">
                                    Are you an {" "}<a href="?page=alumni-login" className="underline text-blue-500">Alumni</a>  {" "} ?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
