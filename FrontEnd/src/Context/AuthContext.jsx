import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setcurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );


    const login =async (inputs) => {
        const res =await axios.post("http://localhost:3000/api/auth/login",inputs,{
            withCredentials:true,
        });
        setcurrentUser(res.data);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};