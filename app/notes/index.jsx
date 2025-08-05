import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddNoteModal from '../../components/AddNoteModal';
import NoteList from '../../components/NoteList';
import { useAuth } from '../../contexts/authContext';
import noteService from '../../services/noteService';

const NoteScreen = () => {
    const router = useRouter();
    const {user, loading: authLoading} = useAuth();
    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (!authLoading && !user) {
            router.replace('/auth')
        }
    }, [user, authLoading])

    useEffect(() => {
        if (user) {
            fetchNotes();
        }
    }, [user]);

    const fetchNotes = async () => {
                setLoading(true);
                const response = await noteService.getNotes();
                if (response.error) {
                    setError(response.error);
                    Alert.alert('Error', response.error.message || 'Failed to fetch notes');
                }else{
                    setNotes(response.data);
                    setError(null);
                }
                setLoading(false);
    }
    // Add new note
    const addNote = async () => {
        if (newNote.trim() === '') return;
        const response = await noteService.AddNote(newNote);

        if (response.error) {
            Alert.alert('Error', response.error.message || 'Failed to add note');
        } else {
            setNotes([...notes, response.data]);
        }

        setNewNote('');
        setModalVisible(false);
    };
    // Delete note
    const deleteNote = async (noteId) => {
        Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
            {
            text: 'Cancel',
            style: 'cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    const response = await noteService.deleteNote(noteId);
                    if (response.error) {
                        Alert.alert('Error', response.error.message || 'Failed to delete note');
                    } else {
                        setNotes(notes.filter(note => note.$id !== noteId));
                    }
                }
            }
        ])
    }
    const editNote = async (noteId, newText) => {
        if(!newText.trim()) {
            Alert.alert('Error', 'Note text cannot be empty');
            return;
        }
        const response = await noteService.updateNote(noteId, newText);
        if (response.error) {
            Alert.alert('Error', response.error.message || 'Failed to update note');
        } else {
            setNotes((prevNotes) => prevNotes.map((note) => note.$id === noteId ? {...note, text: newText} : note));
        }
    }

    return (
        <View style={styles.container}>
            {/* NoteList */}
            { loading ? ( 
                <ActivityIndicator size="large" color="#007bff" /> 
            ) : (
                <>
                {error && <Text style={styles.errorText}>{error.message || error}</Text>}
                <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote}/>   
                </>
            )}

            {/* Add Note Button */}
            <TouchableOpacity style={styles.addButton} onPress={ () => setModalVisible(true) }>
                <Text style={styles.addButtonText}>+ Add Note</Text>
            </TouchableOpacity>

            {/* Modal for Adding Note */}
            <AddNoteModal 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                newNote={newNote} 
                setNewNote={setNewNote} 
                addNote={addNote}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    addButton: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
    },
})
export default NoteScreen