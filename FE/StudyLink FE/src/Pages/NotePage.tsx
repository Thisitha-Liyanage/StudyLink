import {
    Search,
    Plus,
    FileText,
    Download,
    Sparkles,
    Upload,
} from "lucide-react";

const NotesPage = () => {
    return (
        <div className="min-h-screen text-white">

            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8">

                {/* Search */}
                <div className="relative w-[400px]">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                    />

                    <input
                        type="text"
                        placeholder="Search notes..."
                        className="w-full bg-[#1A1D29] border border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4">

                    {/* Upload PDF */}
                    <button className="flex items-center gap-2 bg-[#1A1D29] hover:bg-[#222637] border border-gray-700 transition px-5 py-3 rounded-2xl font-semibold">
                        <Upload size={20} />
                        Upload PDF
                    </button>

                    {/* Add Note */}
                    <button className="flex items-center gap-2 bg-green-500 hover:bg-green-400 transition px-5 py-3 rounded-2xl font-semibold text-black">
                        <Plus size={20} />
                        Add Note
                    </button>

                </div>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-3 gap-6">

                {[
                    {
                        title: "Java OOP Notes",
                        subject: "Programming",
                        pages: 24,
                        summary:
                            "Complete object-oriented programming concepts including inheritance and polymorphism.",
                    },
                    {
                        title: "Database Management",
                        subject: "Database",
                        pages: 18,
                        summary:
                            "SQL queries, normalization and ER diagram explanations.",
                    },
                    {
                        title: "UI/UX Design Basics",
                        subject: "Design",
                        pages: 12,
                        summary:
                            "Color theory, typography and modern interface principles.",
                    },
                    {
                        title: "React Fundamentals",
                        subject: "Frontend",
                        pages: 30,
                        summary:
                            "React components, hooks and state management notes.",
                    },
                    {
                        title: "AI Introduction",
                        subject: "Artificial Intelligence",
                        pages: 20,
                        summary:
                            "Machine learning basics and AI concept overview.",
                    },
                    {
                        title: "Networking Essentials",
                        subject: "Networking",
                        pages: 15,
                        summary:
                            "OSI model, IP addressing and networking fundamentals.",
                    },
                ].map((note, index) => (
                    <div
                        key={index}
                        className="bg-[#1A1D29] border border-gray-800 rounded-2xl p-5 hover:border-green-500/50 hover:scale-[1.02] transition duration-300"
                    >

                        {/* Header */}
                        <div className="flex items-center justify-between mb-5">

                            <div className="flex items-center gap-3">

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                    <FileText
                                        className="text-green-400"
                                        size={24}
                                    />
                                </div>

                                {/* Info */}
                                <div>
                                    <h3 className="font-semibold text-white">
                                        {note.title}
                                    </h3>

                                    <p className="text-xs text-gray-400">
                                        {note.subject}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="min-h-[120px]">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {note.summary}
                            </p>
                        </div>

                        {/* Pages */}
                        <div className="mb-5">
                            <p className="text-sm text-gray-400">
                                {note.pages} Pages
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">


                            {/* Summarize */}
                            <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 transition py-3 rounded-xl text-black font-semibold">
                                <Sparkles size={18} />
                                Summarize
                            </button>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default NotesPage;