import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../../firebase/firebase";
import Loader from "../../../../components/Loader";
import Routes from "../../../../constants/Routes";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";


export default function Student_Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

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
                toast.success(re.data.message);
                window.location.replace("/");
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
                toast.success("Login Successfull");
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
                <div className="relative py-3 w-[40rem] sm:mx-auto">

                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-sky-400 shadow-lg transform sm:-rotate-0 sm:rounded-3xl"></div>

                    {
                        loading ? <div className="absolute z-20 h-full w-full flex justify-center items-center bg-black/35 rounded-3xl top-0">
                            <Loader color="white" />
                        </div> : null
                    }

                    <div className="relative p-10 bg-white shadow-lg border border-slate-200 sm:rounded-3xl">
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

                        <div className="">
                            <p className="text-center text-sm ">
                                Dont have an account ? {" "}<a href="register" className="underline text-blue-500 ">Create New </a>
                            </p>
                        </div>

                        <div className="w-full flex justify-center mt-5">
                            <button onClick={loginWithGoogle} className="flex gap-2 justify-center items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 w-full text-center py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <img src="/google.png" className="h-7 w-7" />
                                <span>Continue with Google</span>
                            </button>
                        </div>

                        <div className="mt-10">
                            <p className="text-center text-sm ">
                                Are you an {" "}<a href="/auth/alumni/login" className="underline text-blue-500">Alumni</a>  {" "} ?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
