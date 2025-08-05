import { database } from './appwrite';

const databaseService = {
    //List Documents
    async listDocuments(dbId, colId) {
        try {
            const response = await database.listDocuments(dbId, colId);
            return response.documents || [];
        }catch (error){
            console.error("Error listing documents:", error.message);
            throw error;
        }
    },
    //Create Document
    async createDocument(dbId, colId, data, id = null){
        try {
            return await database.createDocument(dbId, colId, id || undefined, data);
        } catch (error) {
            console.error("Error creating document:", error.message);
            throw error;
        }
    },
    //Delete Document
    async deleteDocument(dbId, colId, documentId) {
        try {
            await database.deleteDocument(dbId, colId, documentId);
            return {success: true};
        } catch (error) {
            console.error("Error deleting document:", error.message);
            throw error;
        }
    },
    //Update Document
    async updateDocument(dbId, colId, documentId, data){
        try {
            return await database.updateDocument(dbId, colId, documentId, data);
        } catch (error) {
            console.error("Error updating document:", error.message);
            throw error;
        }
    }
      
}

export default databaseService;