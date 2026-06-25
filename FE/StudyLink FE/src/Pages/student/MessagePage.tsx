import { useEffect, useState } from "react";
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

    // ✅ FIXED: Safely fallback to an empty object/array if slice doesn't match 'message' or 'chat'
    const { selectedUser, messages = [] } = useAppSelector(
        (state: any) => state.message || state.chat || {}
    );

    const [text, setText] = useState("");
    const [chatList, setChatList] = useState<any[]>([]);

    // 📌 LOAD CHAT LIST
    useEffect(() => {
        const loadChats = async () => {
            try {
                const data = await getChatList();
                // Ensure data is an array before setting state
                setChatList(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Chat list error", err);
                setChatList([]);
            }
        };

        loadChats();
    }, []);

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

        try {
            const newMsg = await sendMessage({
                receiverId: selectedUser._id,
                message: text,
            });

            // ✅ FIXED: Handles if backend wraps the object inside a wrapper property
            const messagePayload = newMsg?.data || newMsg?.savedMessage || newMsg;
            dispatch(addMessage(messagePayload));
            setText("");
        } catch (err) {
            console.error("Send error", err);
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
                        key={chat.conversationId}
                        onClick={() =>
                            dispatch(
                                setSelectedUser({
                                    _id: chat.userId,
                                    username: chat.username,
                                    profilePic: chat.profilePic,
                                })
                            )
                        }
                        className={`p-3 mb-2 rounded-xl bg-black/30 cursor-pointer hover:bg-black/50 ${selectedUser?._id === chat.userId ? "border border-green-500/50" : ""
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
                                <p className="text-gray-400 text-xs truncate max-w-[150px]">
                                    {chat.lastMessage}
                                </p>
                            </div>
                        </div>
                        {/* ✅ FIXED: Removed the second duplicate chat.lastMessage block from here */}
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
                    {messages.map((msg: any) => {
                        const isMine = msg.senderId === user?._id;

                        return (
                            <div
                                key={msg._id}
                                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-2xl max-w-75 ${isMine
                                            ? "bg-green-500 text-black"
                                            : "bg-black/30 text-white"
                                        }`}
                                >
                                    {msg.message}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* INPUT */}
                <div className="p-4 border-t border-gray-800 flex gap-3">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 bg-black/30 px-4 py-2 rounded-xl text-white outline-none border border-gray-800 focus:border-gray-700"
                        placeholder="Type message..."
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="bg-green-500 px-4 rounded-xl text-black hover:bg-green-600 transition"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;