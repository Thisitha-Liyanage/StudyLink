import { Send, Bot, User } from "lucide-react";
import { useState } from "react";
import { sendAIMessage } from "../../service/AiPageService";

const AIChatPage = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim() || loading) return;

        const userMessage = message;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: userMessage,
            },
        ]);

        setMessage("");
        setLoading(true);

        try {
            const data = await sendAIMessage(userMessage);

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: data.reply,
                },
            ]);
        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: "Sorry, something went wrong.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    console.log("Messages State:", messages);

    return (
        <div className="h-[90vh] flex gap-6 text-white">
            <div className="flex-1 bg-[#1A1D29] border border-gray-800 rounded-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <Bot className="text-green-400" size={24} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg">StudyLink AI</h2>
                            <p className="text-sm text-green-400">Online</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.length === 0 && (
                        <div className="flex gap-4">
                            <div className="w-11 h-11 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                <Bot className="text-green-400" size={20} />
                            </div>

                            <div className="bg-black/30 border border-gray-700 rounded-2xl p-4 max-w-[70%]">
                                <p>Hello 👋 Ask me anything about your studies.</p>
                            </div>
                        </div>
                    )}

                    {messages.map((msg, index) =>
                        msg.role === "user" ? (
                            <div key={index} className="flex justify-end gap-4">
                                <div className="bg-green-500 text-black rounded-2xl p-4 max-w-[70%]">
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>

                                <div className="w-11 h-11 rounded-full bg-gray-700 flex items-center justify-center">
                                    <User size={20} />
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="flex gap-4">
                                <div className="w-11 h-11 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                    <Bot className="text-green-400" size={20} />
                                </div>

                                <div className="bg-black/30 border border-gray-700 rounded-2xl p-4 max-w-[70%]">
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        )
                    )}

                    {loading && (
                        <div className="flex gap-4">
                            <div className="w-11 h-11 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                <Bot className="text-green-400" size={20} />
                            </div>

                            <div className="bg-black/30 border border-gray-700 rounded-2xl p-4">
                                <p>Typing...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="p-5 border-t border-gray-800">
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            placeholder="Ask AI anything..."
                            className="flex-1 bg-black/30 border border-gray-700 rounded-xl py-3 px-4 text-white outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="bg-green-500 hover:bg-green-400 transition p-3 rounded-xl text-black disabled:opacity-50"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatPage;