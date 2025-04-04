import Student_Register from './app/(routes-partition)/(auth)/Student_Register';
import Alumni_Register from './app/(routes-partition)/(auth)/Alumni_Register';
import Student_Login from './app/(routes-partition)/(auth)/Student_Login';
import Alumni_Login from './app/(routes-partition)/(auth)/Alumni_Login';
import { Outlet, useSearchParams } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useStudent } from './context/StudentContext';
import { useAlumni } from './context/AlumniContext';

export type AuthSection_Type = "student-login" | "student-signin" | "alumni-login" | "alumni-signin"

export default function Auth_Layout() {
    const { alumni } = useAlumni();
    const { student } = useStudent();

    const [section, setSection] = useState<AuthSection_Type>("student-login")
    const [seParams] = useSearchParams();

    useEffect(() => {
        if (seParams.get("page") == null)
            setSection("student-login");
        else if (["student-login", "student-signin", "alumni-login", "alumni-signin"].includes(seParams.get("page") ?? "student-login"))
            setSection(seParams.get("page") as AuthSection_Type)
    }, [seParams])

    const sectionComponents: { [key: string]: ReactNode } = {
        "student-login": <Student_Login />,
        "student-signin": <Student_Register />,
        "alumni-login": <Alumni_Login />,
        "alumni-signin": <Alumni_Register />
    }

    if (student || alumni)
        return <Outlet />

    return sectionComponents[section];
}
