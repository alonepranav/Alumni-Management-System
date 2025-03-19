import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import Routes from "../constants/Routes";

interface Alumni {
    id: string;
    name: string;
    email: string;
    batch: string;
    company: string;
    designation: string;
    linkedin: string;
    bio: string;
    achievements: string;
    profileImage: string;
}

interface AlumniContextType {
    alumni: Alumni | null;
    setAlumni: (alumni: Alumni | null) => void;
    verifyToken: (token: string, email: string) => Promise<void>;
}

const AlumniContext = createContext<AlumniContextType>({
    alumni: null,
    setAlumni: () => null,
    verifyToken: async () => { }
});

export default function AlumniProvider({ children }: { children: ReactNode }) {
    const [alumni, setAlumni] = useState<Alumni | null>(null);

    const verifyToken = async (token: string, email: string) => {
        try {
            const res = await axios.post(Routes.Alumni_Verify(), { token, email });
            if (res.data.success) {
                setAlumni(res.data.user);
            } else {
                setAlumni(null);
            }
        } catch (error) {
            setAlumni(null);
        }
    };

    useEffect(() => {
        const storedData = localStorage.getItem("alumni");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData.token && parsedData.email) {
                verifyToken(parsedData.token, parsedData.email);
            }
        }
    }, []);

    return (
        <AlumniContext.Provider value={{ alumni, setAlumni, verifyToken }}>
            {children}
        </AlumniContext.Provider>
    );
};

export const useAlumni = () => useContext(AlumniContext);
