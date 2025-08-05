import { ID } from 'react-native-appwrite';
import databaseService from '../services/databaseService';

// Appwrite Database ID and Collection ID
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

// Note Service
const noteService = {
    //Get Notes
    async getNotes() {
        const response = await databaseService.listDocuments(dbId, colId);
        if (response.error) {
            return {error: response.error};
        }
        return {data: response};
    },
    //Add Notes
    async AddNote(text){
        if (!text) {
            return {error: {message: 'Note text cannot be empty'}};
        }
        const data = {text: text, createdAt: new Date().toISOString()};
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