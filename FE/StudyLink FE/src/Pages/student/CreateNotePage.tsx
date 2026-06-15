import { Save, Trash2, ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../../hooks/useNote";
import { extractTextFromPDF } from "../../service/NoteService";
import { useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../../service/NoteService";
import { deleteNoteThunk } from "../../redux/slices/notesslice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { summarizeNoteThunk } from "../../redux/slices/AISlice";

const CreateNotePage = () => {
    const { id } = useParams();
    useEffect(() => {
        const loadNote = async () => {
            if (!id) return;

            try {
                const note = await getNoteById(id);

                setTitle(note.title);
                setContent(note.content);
            } catch (err) {
                console.error("Failed to load note:", err);
            }
        };

        loadNote();
    }, [id]);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { createNote } = useNotes();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    const handleSave = async () => {
        if (!title || !content) return;

        try {
            if (id) {
                await updateNote(id, title, content);
            } else {
                await createNote(title, content);
            }

            navigate("/student/notes");
        } catch (err) {
            console.error("Failed to save note:", err);
        }
    };
    const handleDelete = async () => {
        if (!id) {
            setTitle("");
            setContent("");
            setPdfFile(null);
            return;
        }

        // ✅ confirmation popup
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmDelete) return;

        try {
            await dispatch(deleteNoteThunk(id)).unwrap();
            navigate("/student/notes");
        } catch (err) {
            console.error("Failed to delete note:", err);
        }
    };


    // const { summary, summaryLoading } = useAppSelector((state) => state.ai);

    const handleSummarize = async () => {
        if (!content.trim()) {
            alert("Note content is empty!");
            return;
        }

        try {
            const result = await dispatch(
                summarizeNoteThunk(content)
            ).unwrap();


            setContent(result);

        } catch (err) {
            console.error("Summarize failed:", err);
            alert("Failed to summarize note");
        }
    };



    return (
        <div className="min-h-screen text-white">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => navigate("/student/notes")}
                        className="p-3 rounded-xl bg-[#1A1D29] border border-gray-700 hover:bg-[#222637]"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <h1 className="text-3xl font-bold">
                        {id ? title || "Edit Note" : "Create Note"}
                    </h1>

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={handleSummarize}
                        // disabled={summaryLoading}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-200 px-5 py-3 rounded-xl font-semibold text-black disabled:opacity-50"
                    >
                        ✨ Summarize
                    </button>

                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-400 px-5 py-3 rounded-xl font-semibold text-black"
                    >
                        <Trash2 size={18} />
                        Delete
                    </button>

                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-400 px-5 py-3 rounded-xl font-semibold text-black"
                    >
                        <Save size={18} />
                        Save Note
                    </button>

                </div>

            </div>

            
            {/* Form */}
            <div className="bg-[#1A1D29] border border-gray-800 rounded-2xl p-6">

                {/* Title */}
                <div className="mb-6">
                    <label className="block mb-2 text-gray-300">
                        Note Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-[#10131C] border border-gray-700 rounded-xl px-4 py-3"
                    />
                </div>

                {/* PDF Upload */}
                <div className="mb-6">
                    <label className="block mb-2 text-gray-300">
                        Upload PDF
                    </label>

                    <label
                        htmlFor="pdf-upload"
                        className="flex flex-col items-center justify-center gap-3 w-full h-40 border-2 border-dashed border-gray-600 rounded-2xl cursor-pointer"
                    >
                        <Upload size={32} className="text-green-400" />

                        <span className="text-gray-300">
                            Click to upload PDF
                        </span>

                        {pdfFile && (
                            <span className="text-green-400 text-sm">
                                {pdfFile.name}
                            </span>
                        )}
                    </label>

                    {/* ✅ THIS is where logic goes */}
                    <input
                        id="pdf-upload"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setPdfFile(file);

                            try {
                                const text = await extractTextFromPDF(file);

                                // auto-fill textarea
                                setContent(text);
                            } catch (err) {
                                console.error("PDF read failed:", err);
                                alert("Cannot read this PDF properly");
                            }
                        }}
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block mb-2 text-gray-300">
                        Content
                    </label>

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={18}
                        className="w-full bg-[#10131C] border border-gray-700 rounded-xl px-4 py-4"
                    />
                </div>

            </div>
        </div>
    );
};

export default CreateNotePage;