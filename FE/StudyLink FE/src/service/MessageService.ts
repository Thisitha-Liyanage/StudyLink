import axios from "axios";

const getToken = () => localStorage.getItem("token");

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
});

// 📌 FETCH CONVERSATION HISTORY
export const getMessages = async (receiverId: string) => {
    const res = await axios.get(
        `https://study-link-jwxa.vercel.app/messages/conversation/${receiverId}`,
        getAuthHeaders() 
    ); 
    return res.data;
};

// 📤 SEND NEW MESSAGE (Mapped directly to your exact verified endpoint)
export const sendMessage = async (data: {
    receiverId: string;
    message: string;
}) => {
    const res = await axios.post(
        `https://study-link-jwxa.vercel.app/messages/send`,
        data,
        getAuthHeaders() 
    );
    return res.data;
};

// 📌 FETCH SIDEBAR CHAT LIST
export const getChatList = async () => {
    const res = await axios.get(
        `https://study-link-jwxa.vercel.app/messages/chat-list`,
        getAuthHeaders() 
    );
    return res.data;
};