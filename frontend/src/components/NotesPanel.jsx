import React, { useState } from 'react';
import Note from './Note';
import { useNotes } from '../context/NotesContext';

const NotesPanel = ({ isSidePanelOpen }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const { notes, loading, addNote, togglePin, toggleArchive, deleteNote, updateNote } = useNotes();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await addNote({ title, content });
            setTitle('');
            setContent('');
            setIsFormOpen(false);
        } catch (error) {
            setError(error.message || 'Error creating note');
            console.error('Error creating note:', error);
        }
    };

    const handlePin = async (noteId) => {
        try {
            await togglePin(noteId);
        } catch (error) {
            console.error('Error toggling pin:', error);
        }
    };

    const handleArchive = async (noteId) => {
        try {
            await toggleArchive(noteId);
        } catch (error) {
            console.error('Error toggling archive:', error);
        }
    };

    const handleDelete = async (noteId) => {
        try {
            await deleteNote(noteId);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleUpdate = async (noteId) => {
        // Implement update logic here
        console.log('Update note:', noteId);
    };

    return (
        <div className={`transition-all duration-300 ease-in-out ${
            isSidePanelOpen ? 'ml-80' : 'ml-0'
        } flex-1 min-h-screen bg-[#F5E6D3] p-8 relative`}>
            <h1 className="text-2xl font-bold text-[#8B7355] mb-6">My Notes</h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-[#8B7355]">Loading notes...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map(note => (
                        <Note
                            key={note._id}
                            {...note}
                            onPin={() => handlePin(note._id)}
                            onArchive={() => handleArchive(note._id)}
                            onDelete={() => handleDelete(note._id)}
                            onUpdate={() => handleUpdate(note._id)}
                        />
                    ))}
                </div>
            )}

            <button
                onClick={() => setIsFormOpen(true)}
                className="fixed bottom-8 right-8 w-14 h-14 bg-[#E7C8A0] hover:bg-[#DEB887] 
                         text-[#8B7355] rounded-full shadow-lg flex items-center justify-center 
                         transition-all duration-300 hover:shadow-xl"
                aria-label="Create new note"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </button>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#FFF5E4] p-6 rounded-2xl shadow-xl w-96 border border-[#E7C8A0]">
                        <h2 className="text-xl font-semibold text-[#8B7355] mb-4">Create New Note</h2>
                        {error && (
                            <p className="text-red-500 mb-4 text-sm">{error}</p>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                required
                                className="w-full p-3 rounded-lg bg-[#FAF0E6] text-[#8B7355]
                                         border border-[#E7C8A0] placeholder-[#B4A390]
                                         focus:outline-none focus:border-[#B4A390] focus:ring-1 
                                         focus:ring-[#B4A390] transition duration-200"
                            />
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Note content"
                                required
                                rows="4"
                                className="w-full p-3 rounded-lg bg-[#FAF0E6] text-[#8B7355]
                                         border border-[#E7C8A0] placeholder-[#B4A390]
                                         focus:outline-none focus:border-[#B4A390] focus:ring-1 
                                         focus:ring-[#B4A390] transition duration-200 resize-none"
                            />
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-4 py-2 rounded-lg text-[#8B7355] hover:bg-[#FAF0E6]
                                             transition duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#E7C8A0] text-[#8B7355] rounded-lg
                                             hover:bg-[#DEB887] transition duration-200 shadow-sm"
                                >
                                    Create Note
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotesPanel;