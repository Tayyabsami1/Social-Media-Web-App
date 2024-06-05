import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setcurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );


    const login =async (inputs) => {
        // In response we get the User data 
        const res =await axios.post(`${import.meta.env.VITE_Backend_Url}/api/auth/login`,inputs,{
            // withCredentials:true,
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': 'https://socialsparks.netlify.app',
              },
        });
        // We set the User in our local storage
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