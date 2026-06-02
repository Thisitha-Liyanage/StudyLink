import {
    Send,
    Bot,
    User,
    Upload,
    FileText,
    Sparkles,
} from "lucide-react";

const AIChatPage = () => {
    return (
        <div className="h-[90vh] flex gap-6 text-white">

            {/* Left Panel */}
            <div className="w-[320px] bg-[#1A1D29] border border-gray-800 rounded-2xl p-5 flex flex-col">

                {/* Title */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-green-400">
                        AI Assistant
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                        Upload notes and ask questions
                    </p>
                </div>

                {/* Upload Section */}
                <div className="bg-black/30 border border-dashed border-gray-700 rounded-2xl p-6 text-center mb-6">

                    <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                        <Upload className="text-green-400" size={26} />
                    </div>

                    <h3 className="font-semibold mb-2">
                        Upload Notes
                    </h3>

                    <p className="text-sm text-gray-400 mb-4">
                        Upload PDF or documents for AI summarization
                    </p>

                    <button className="bg-green-500 hover:bg-green-400 transition px-5 py-3 rounded-xl text-black font-semibold">
                        Choose File
                    </button>
                </div>

                {/* Uploaded Notes */}
                <div className="flex-1 overflow-y-auto">

                    <h3 className="text-sm font-semibold text-gray-400 mb-4">
                        Uploaded Notes
                    </h3>

                    <div className="space-y-3">

                        {[
                            "Java_OOP_Notes.pdf",
                            "React_Fundamentals.pdf",
                            "Database_Management.pdf",
                        ].map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 bg-black/20 border border-gray-700 rounded-xl p-3 hover:border-green-500/40 transition"
                            >

                                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                    <FileText
                                        className="text-green-400"
                                        size={20}
                                    />
                                </div>

                                <div className="flex-1">
                                    <p className="text-sm text-white truncate">
                                        {file}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        PDF File
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1 bg-[#1A1D29] border border-gray-800 rounded-2xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-800">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <Bot className="text-green-400" size={24} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg">
                                StudyLink AI
                            </h2>

                            <p className="text-sm text-green-400">
                                Online
                            </p>
                        </div>
                    </div>

                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* AI Message */}
                    <div className="flex gap-4">

                        <div className="w-11 h-11 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <Bot className="text-green-400" size={20} />
                        </div>

                        <div className="bg-black/30 border border-gray-700 rounded-2xl p-4 max-w-[70%]">
                            <p className="text-gray-200 leading-relaxed">
                                Hello 👋 Upload your study notes and I can help
                                summarize them, answer questions, or explain
                                difficult topics.
                            </p>
                        </div>
                    </div>

                    {/* User Message */}
                    <div className="flex justify-end gap-4">

                        <div className="bg-green-500 text-black rounded-2xl p-4 max-w-[70%]">
                            <p>
                                Can you summarize the Java OOP notes?
                            </p>
                        </div>

                        <div className="w-11 h-11 rounded-full bg-gray-700 flex items-center justify-center">
                            <User size={20} />
                        </div>
                    </div>

                    {/* AI Reply */}
                    <div className="flex gap-4">

                        <div className="w-11 h-11 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <Bot className="text-green-400" size={20} />
                        </div>

                        <div className="bg-black/30 border border-gray-700 rounded-2xl p-4 max-w-[70%]">
                            <p className="text-gray-200 leading-relaxed">
                                Object-Oriented Programming focuses on classes,
                                objects, inheritance, encapsulation,
                                polymorphism and abstraction. These concepts
                                help create reusable and maintainable code.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Input */}
                <div className="p-5 border-t border-gray-800">

                    <div className="flex items-center gap-4">

                        <input
                            type="text"
                            placeholder="Ask AI anything about your notes..."
                            className="flex-1 bg-black/30 border border-gray-700 rounded-xl py-3 px-4 text-white outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button className="bg-green-500 hover:bg-green-400 transition p-3 rounded-xl text-black">
                            <Send size={20} />
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AIChatPage;