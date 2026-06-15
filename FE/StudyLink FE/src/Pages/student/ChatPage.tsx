import { Send, Bot, User } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { askAIThunk } from "../../redux/slices/AISlice";

const AIChatPage = () => {
  const dispatch = useAppDispatch();

  const { messages, loading } = useAppSelector((state) => state.ai);

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim() || loading) return;

    dispatch(askAIThunk(message));
    setMessage("");
  };

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

              <div className="bg-black/30 border border-gray-700 rounded-2xl p-4">
                <p>Hello 👋 Ask me anything about your studies.</p>
              </div>
            </div>
          )}

          {messages.map((msg, index) =>
            msg.role === "user" ? (
              <div key={index} className="flex justify-end gap-4">
                <div className="bg-green-500 text-black rounded-2xl p-4 max-w-[70%]">
                  {msg.text}
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
                  {msg.text}
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
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-5 border-t border-gray-800 flex gap-4">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-black/30 border border-gray-700 rounded-xl px-4 py-3"
            placeholder="Ask AI..."
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-green-500 p-3 rounded-xl text-black"
          >
            <Send size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AIChatPage;