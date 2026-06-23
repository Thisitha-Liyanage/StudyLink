import {
    Plus,
    FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchNotes } from "../../redux/slices/notesslice";

const NotesPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { notes } = useAppSelector((state) => state.notes);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    return (
        <div className="min-h-screen text-white">

            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8">


                <div className="flex items-center gap-4">

                    {/* Add Note */}
                    <button
                        onClick={() => navigate("/student/notes/create")}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-400 px-5 py-3 rounded-2xl font-semibold text-black"
                    >
                        <Plus size={20} />
                        Add Note
                    </button>

                </div>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-3 gap-6">

                {notes.map((note) => (
                    <div
                        key={note._id}
                       onClick={() => navigate(`/student/notes/create/${note._id}`)}
                        className="cursor-pointer bg-[#1A1D29] border border-gray-800 rounded-2xl p-5 hover:border-green-500/50 hover:scale-[1.02] transition duration-300"
                    >

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">

                            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <FileText className="text-green-400" size={24} />
                            </div>

                            <div>
                                <h3 className="font-semibold text-white">
                                    {note.title}
                                </h3>
                            </div>

                        </div>

                        {/* Content Preview */}
                        <p className="text-gray-300 text-sm line-clamp-4">
                            {note.content}
                        </p>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default NotesPage;