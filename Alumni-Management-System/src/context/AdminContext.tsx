import { createContext, useState, useContext, ReactNode } from "react";
import Admin_Login from "../app/ams-admin/@unauth/Admin_Login";

interface Admin {
    name: string;
    email: string;
    token: string;
}

interface AdminContextType {
    admin: Admin | null;
    setAdmin: (admin: Admin | null) => void;
}

const AdminContext = createContext<AdminContextType>({ admin: null, setAdmin: () => { } });

export default function AdminProvider({ children }: { children: ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);

    return (
        <AdminContext.Provider value={{ admin, setAdmin }}>
            {
                admin ? children : <Admin_Login />
            }
        </AdminContext.Provider>
    );
};


export const useAdmin = () => useContext(AdminContext);