import { Outlet } from "react-router-dom";
import AdminProvider from "../../context/AdminContext";

export default function AdminLayout() {
    return (
        <AdminProvider>
            <div className="flex justify-center items-center py-3 absolute top-0 left-0 w-screen">
                <div className="bg-black px-10 py-1.5 rounded-full">
                    <p className="text-white font-semibold text-lg">Admin - Alumni Management System</p>
                </div>
            </div>
            <Outlet />
        </AdminProvider>
    )
}
