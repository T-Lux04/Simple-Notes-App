import { ID, Query } from 'react-native-appwrite';
import databaseService from '../services/databaseService';

// Appwrite Database ID and Collection ID
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

// Note Service
const noteService = {
    //Get Notes
    async getNotes(user_id) {
        if (!user_id) {
            console.error('Error: Missing user ID');
            return {data: [], error: {message: 'User ID is required'}};
        }

        try {
            const response = await databaseService.listDocuments(dbId, colId, [Query.equal('user_id', user_id)]);
            return response;
        } catch (error) {
            console.error('Error fetching notes:', error.message);
            return {data: [], error: {message: 'Failed to fetch notes'}};
        }
    },
    //Add Notes
    async AddNote(user_id, text){
        if (!text) {
            return {error: {message: 'Note text cannot be empty'}};
        }
        const data = {text: text, createdAt: new Date().toISOString(), user_id: user_id};
        const response = await databaseService.createDocument(dbId, colId, data, ID.unique());
        if (response?.error) {
            return {error: response.error};
        }
        return {data: response};
    },
    async deleteNote(noteId){
        if (!noteId) {
            return {error: {message: 'Note ID cannot be empty'}};
        }
        const response = await databaseService.deleteDocument(dbId, colId, noteId);
        if (response?.error){
            return {error: response.error};
        }  
        return {success: true};
    },
    async updateNote(noteId, text) {
        const response = await databaseService.updateDocument(dbId, colId, noteId, {text: text});
        if (response?.error) {
            return {error: response.error};
        }
        return {data: response};
    }
}

export default noteService;