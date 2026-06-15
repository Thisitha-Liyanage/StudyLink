import { createContext, useEffect, useState } from "react";
import { getNotes, createNote, deleteNote } from "../service/NoteService";

type Note = {
    _id: string;
    title: string;
    content: string;
};

type NotesContextType = {
    notes: Note[];
    loading: boolean;
    createNote: (title: string, content: string) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    refreshNotes: () => Promise<void>;
};

export const NotesContext = createContext<NotesContextType>({
    notes: [],
    loading: false,
    createNote: async () => { },
    deleteNote: async () => { },
    refreshNotes: async () => { },
});

export const NotesProvider = ({ children }: any) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);

    const refreshNotes = async () => {
        setLoading(true);
        try {
            const data = await getNotes();
            setNotes(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (title: string, content: string) => {
        const newNote = await createNote(title, content);
        setNotes((prev) => [newNote, ...prev]);
    };

    const handleDelete = async (id: string) => {
        await deleteNote(id);
        setNotes((prev) => prev.filter((n) => n._id !== id));
    };

    useEffect(() => {
        refreshNotes();
    }, []);

    return (
        <NotesContext.Provider
            value={{
                notes,
                loading,
                createNote: handleCreate,
                deleteNote: handleDelete,
                refreshNotes,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};