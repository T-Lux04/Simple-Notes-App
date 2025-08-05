import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        setloading(true);
        const response = await authService.getCurrentUser();
        if(response?.error){
            setUser(null);
        } else {
            setUser(response);
        }
        setloading(false);
    }

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        if(response?.error) {
            return {error: response.error};
        }

        await checkUser();
        return {success: true};
    };
    const register = async (email, password) => {
        const response = await authService.register(email, password);
        if(response?.error) {
            return {error: response.error};
        }

        return login(email, password); //Auto-Login after registration
    };
    const logout = async () => {
        await authService.logout();
        setUser(null);
        await checkUser();
    };
    return (
        <AuthContext.Provider value={{user, login, register, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};