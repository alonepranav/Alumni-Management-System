import { ChangeEvent, FormEvent, useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import axios from "axios";
import toast from "react-hot-toast";
import Routes from "../../../constants/Routes";
import Loader from "../../../components/Loader";

const Admin_Login = () => {
    const { setAdmin } = useAdmin();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(Routes.Admin_Login(), { ...formData });

            if (res.data.success) {
                toast.success(res.data.message);
                setAdmin({
                    email: res.data.email,
                    name: res.data.name,
                    token: res.data.token,
                });
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="relative w-[28rem] mx-auto px-6 py-8 shadow-md rounded-2xl border border-slate-300">
                {
                    loading ? <div className="absolute z-20 h-full w-full flex justify-center items-center bg-black/35 rounded-2\xl top-0 right-0">
                        <Loader color="white" />
                    </div> : null
                }

                <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
                <br />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 mt-4 mb-3 rounded-full hover:bg-blue-700">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Admin_Login;
