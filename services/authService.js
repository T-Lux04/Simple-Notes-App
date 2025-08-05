import { ID } from 'react-native-appwrite';
import { account } from "./appwrite";

const authService = {
    //Register User
    async register(email, password) {
        try {
            const response = await account.create(ID.unique(), email, password);
            return response;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    },
    //login User
    async login(email, password) {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },
    //Get Current User
    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    },
    //Logout User
    async logout() {
        try {
            await account.deleteSession("current");
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    }
}

export default authService;