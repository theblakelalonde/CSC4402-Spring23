// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//     const [curretnUser, setCurrentUser] = useState(
//         JSON.parse(localStorage.getItem("user")) || null
//     );

// const login = () => {
    
// };

// useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(curretnUser));
// }, [currentUser]);

// return (
//     <AuthContext.Provider value = {{currentUser, login }}>
//         {children}
//     </AuthContext.Provider>
// );
// };