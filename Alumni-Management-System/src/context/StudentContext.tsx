import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import Routes from "../constants/Routes";

interface Student {
    id: string;
    name: string;
    email: string;
    profileImage: string;
    batch: string;
    linkedin: string;
    bio: string;
    interests: string;
}

interface StudentContextType {
    student: Student | null;
    setStudent: (student: Student | null) => void;
}

const StudentContext = createContext<StudentContextType>({ student: null, setStudent: () => null });

export default function StudentProvider({ children }: { children: ReactNode }) {
    const [student, setStudent] = useState<Student | null>(null);

    const verifyToken = async (token: string, email: string) => {
        try {
            const res = await axios.post(Routes.Student_Verify(), { token, email });
            if (res.data.success) {
                // console.log(res.data.user)
                setStudent(res.data.user);
            } else {
                setStudent(null);
            }
        } catch (error) {
            setStudent(null);
        }
    };

    useEffect(() => {
        const l = localStorage.getItem("student");
        if (l) {
            const r = JSON.parse(l);
            if (r.token && r.email)
                verifyToken(r.token, r.email);
        }
    }, [])

    return (
        <StudentContext.Provider value={{ student, setStudent }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudent = () => {
    const a = useContext(StudentContext);
    return a;
};
