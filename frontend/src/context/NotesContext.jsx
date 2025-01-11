import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/notes', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotes(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Error fetching notes');
        } finally {
            setLoading(false);
        }
    };

    const addNote = async (noteData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.post('http://localhost:3000/api/notes', noteData, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.data || !response.data.note) {
                throw new Error('Invalid response from server');
            }

            setNotes(prev => [...prev, response.data.note]);
            return response.data;
        } catch (error) {
            console.error('Error in addNote:', error);
            throw error.response?.data?.message || error.message || 'Error creating note';
        }
    };

    const updateNote = async (id, noteData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:3000/api/notes/${id}`, noteData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotes(prev => prev.map(note => 
                note._id === id ? response.data.note : note
            ));
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error updating note';
        }
    };

    const deleteNote = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/notes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotes(prev => prev.filter(note => note._id !== id));
        } catch (error) {
            throw error.response?.data?.message || 'Error deleting note';
        }
    };

    const togglePin = async (id) => {
        try {
            const note = notes.find(n => n._id === id);
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:3000/api/notes/${id}/pin`, 
                { isPinned: !note.isPinned },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setNotes(prev => prev.map(note => 
                note._id === id ? response.data.note : note
            ));
        } catch (error) {
            throw error.response?.data?.message || 'Error toggling pin';
        }
    };

    const toggleArchive = async (id) => {
        try {
            const note = notes.find(n => n._id === id);
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:3000/api/notes/${id}/archive`, 
                { isArchived: !note.isArchived },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setNotes(prev => prev.map(note => 
                note._id === id ? response.data.note : note
            ));
        } catch (error) {
            throw error.response?.data?.message || 'Error toggling archive';
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <NotesContext.Provider value={{
            notes,
            loading,
            error,
            addNote,
            updateNote,
            deleteNote,
            togglePin,
            toggleArchive,
            fetchNotes
        }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => useContext(NotesContext); 