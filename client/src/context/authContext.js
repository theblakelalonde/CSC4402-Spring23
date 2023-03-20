import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

const login = () => {
    setCurrentUser({
        id:1,
        name: "John Code",
        profielPic: "https://media.licdn.com/dms/image/C5103AQG7LmXQUi6m_A/profile-displayphoto-shrink_800_800/0/1516842754622?e=2147483647&v=beta&t=Mj_aG0_VaNG32L8F2ZbXD7p6v5Jb_XD2VuGnT5oszlQ"
    });
};

useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
}, [currentUser]);

return (
    <AuthContext.Provider value = {{currentUser, login }}>
        {children}
    </AuthContext.Provider>
);
};