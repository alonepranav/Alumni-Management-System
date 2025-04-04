import StudentProvider from "../context/StudentContext";
import AlumniProvider from "../context/AlumniContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Index_Layout() {
    return (
        <AlumniProvider>
            <StudentProvider>
                <Navbar />
                <Outlet />
                <Footer />
            </StudentProvider>
        </AlumniProvider>
    )
}
