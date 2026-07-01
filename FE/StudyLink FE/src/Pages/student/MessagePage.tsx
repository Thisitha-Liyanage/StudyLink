import { useEffect, useState, useRef } from "react";
import { Send, MoreVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    getMessages,
    sendMessage,
    getChatList,
} from "../../service/MessageService";

import {
    setMessages,
    addMessage,
    setSelectedUser,
} from "../../redux/slices/MessageSlice";

import { useAuth } from "../../hooks/useAuth";

const MessagesPage = () => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const { selectedUser, messages = [] } = useAppSelector(
        (state: any) => state.message || state.chat || {}
    );

    const [text, setText] = useState("");
    const [chatList, setChatList] = useState<any[]>([]);

    // 🔄 AUTO SCROLL DOWN HANDLER
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 📌 LOAD CHAT LIST (Only dependencies on selection to prevent loop crashes)
    useEffect(() => {
        const loadChats = async () => {
            try {
                const data = await getChatList();
                setChatList(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Chat list error", err);
                setChatList([]);
            }
        };

        loadChats();
    }, [selectedUser]); // ✅ FIXED: Prevents infinite fetch loops

    // 📌 LOAD CONVERSATION
    useEffect(() => {
        const loadMessages = async () => {
            if (!selectedUser?._id) return;

            try {
                const data = await getMessages(selectedUser._id);
                dispatch(setMessages(Array.isArray(data) ? data : []));
            } catch (err) {
                console.error("Messages error", err);
                dispatch(setMessages([]));
            }
        };

        loadMessages();
    }, [selectedUser, dispatch]);

    // 📤 SEND MESSAGE
    const handleSend = async () => {
        if (!text.trim() || !selectedUser?._id) return;

        const currentText = text;
        setText("");

        try {
            const newMsg = await sendMessage({
                receiverId: selectedUser._id,
                message: currentText,
            });

            const messagePayload = newMsg?.data || newMsg?.savedMessage || newMsg;
            dispatch(addMessage(messagePayload));

            setChatList((prevChats) =>
                prevChats.map((chat) =>
                    chat.userId === selectedUser._id
                        ? { ...chat, lastMessage: currentText }
                        : chat
                )
            );
        } catch (err) {
            console.error("Send error", err);
            setText(currentText);
        }
    };

    return (
        <div className="h-[90vh] flex gap-6 text-white">
            {/* LEFT CHAT LIST */}
            <div className="w-87.5 bg-[#1A1D29] border border-gray-800 rounded-2xl p-5 overflow-y-auto">
                <h3 className="text-gray-400 mb-3">Chats</h3>

                {chatList.length === 0 && (
                    <p className="text-gray-500">No chats yet</p>
                )}

                {chatList.map((chat: any) => (
                    <div
                        key={chat.conversationId || chat.userId}
                        onClick={() =>
                            dispatch(
                                setSelectedUser({
                                    _id: chat.userId,
                                    username: chat.username,
                                    profilePic: chat.profilePic,
                                })
                            )
                        }
                        className={`p-3 mb-2 rounded-xl bg-black/30 cursor-pointer hover:bg-black/50 ${
                            selectedUser?._id === chat.userId ? "border border-green-500/50" : ""
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={chat.profilePic || "/default-avatar.png"}
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div>
                                <p className="text-white font-semibold">
                                    {chat.username}
                                </p>
                                <p className="text-gray-400 text-xs truncate max-w-37.5">
                                    {chat.lastMessage || "No messages yet"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT CHAT WINDOW */}
            <div className="flex-1 bg-[#1A1D29] border border-gray-800 rounded-2xl flex flex-col">
                {/* HEADER */}
                <div className="p-5 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="font-semibold">
                        {selectedUser?.username || "Select Chat"}
                    </h2>
                    <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
                </div>

                {/* MESSAGES */}
                <div className="flex-1 p-5 space-y-3 overflow-y-auto">
                    {messages.length === 0 && selectedUser?._id && (
                        <p className="text-gray-500 text-center mt-4">No conversation history. Say Hello!</p>
                    )}
                    {messages.map((msg: any) => {
                        // ✅ FIXED: Using direct type casting to bypass the TS2339 property evaluation error safely
                        const currentUserId = user?._id || (user as any)?.id;
                        const isMine = msg.senderId === currentUserId;

                        return (
                            <div
                                key={msg._id || Math.random().toString()}
                                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-2xl max-w-75 break-words ${
                                        isMine
                                            ? "bg-green-500 text-black rounded-tr-none"
                                            : "bg-black/30 text-white rounded-tl-none"
                                    }`}
                                >
                                    {msg.message}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* INPUT */}
                <div className="p-4 border-t border-gray-800 flex gap-3">
                    <input
                        value={text}
                        disabled={!selectedUser?._id}
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 bg-black/30 px-4 py-2 rounded-xl text-white outline-none border border-gray-800 focus:border-gray-700 disabled:opacity-50"
                        placeholder={selectedUser?._id ? "Type message..." : "Select a contact first..."}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!selectedUser?._id || !text.trim()}
                        className="bg-green-500 px-4 rounded-xl text-black hover:bg-green-600 transition disabled:opacity-50"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;