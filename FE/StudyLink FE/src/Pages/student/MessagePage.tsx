import { useEffect, useState } from "react";
import {Send, MoreVertical } from "lucide-react";
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

    // ⚠️ FIX: slice name is "message" NOT "chat"
    const { selectedUser, messages } = useAppSelector(
        (state) => state.chat
    );

    const [text, setText] = useState("");
    const [chatList, setChatList] = useState<any[]>([]);

    // 📌 LOAD CHAT LIST
    useEffect(() => {
        const loadChats = async () => {
            try {
                const data = await getChatList();
                setChatList(data);
            } catch (err) {
                console.error("Chat list error", err);
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
                dispatch(setMessages(data));
            } catch (err) {
                console.error("Messages error", err);
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

            dispatch(addMessage(newMsg));
            setText("");
        } catch (err) {
            console.error("Send error", err);
        }
    };

    return (
        <div className="h-[90vh] flex gap-6 text-white">


            <div className="w-87.5 bg-[#1A1D29] border border-gray-800 rounded-2xl p-5 overflow-y-auto">

                <h3 className="text-gray-400 mb-3">Chats</h3>

                {chatList.length === 0 && (
                    <p className="text-gray-500">No chats yet</p>
                )}

                {chatList.map((chat: any) => {
                    // const myId = user?._id;

                    // 🔥 IMPORTANT: backend already gives "other user id"
                    // const otherUserId = chat.userId;

                    return (
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
                            className="p-3 mb-2 rounded-xl bg-black/30 cursor-pointer hover:bg-black/50"
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

                                    <p className="text-gray-400 text-xs">
                                        {chat.lastMessage}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-400 text-xs">
                                {chat.lastMessage}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* RIGHT CHAT */}
            <div className="flex-1 bg-[#1A1D29] border border-gray-800 rounded-2xl flex flex-col">

                {/* HEADER */}
                <div className="p-5 border-b border-gray-800 flex justify-between">
                    <h2 className="font-semibold">
                        {selectedUser?.username || "Select Chat"}
                    </h2>

                    <MoreVertical size={20} />
                </div>

                {/* MESSAGES */}
                <div className="flex-1 p-5 space-y-3 overflow-y-auto">

                    {messages.map((msg: any) => {
                        const isMine = msg.senderId === user?._id;

                        return (
                            <div
                                key={msg._id}
                                className={`flex ${isMine ? "justify-end" : "justify-start"
                                    }`}
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
                        className="flex-1 bg-black/30 px-4 py-2 rounded-xl text-white"
                        placeholder="Type message..."
                    />

                    <button
                        onClick={handleSend}
                        className="bg-green-500 px-4 rounded-xl text-black"
                    >
                        <Send size={18} />
                    </button>

                </div>
            </div>
        </div>
    );
};

export default MessagesPage;