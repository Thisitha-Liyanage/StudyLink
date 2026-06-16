import axios from "axios";

const API = "http://localhost:5000/api/messages";

const getToken = () => localStorage.getItem("token");

// 📥 GET CONVERSATION
export const getMessages = async (receiverId: string) => {
    const res = await axios.get(
        `${API}/conversation/${receiverId}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    return res.data;
};

// 📤 SEND MESSAGE
export const sendMessage = async (data: {
    receiverId: string;
    message: string;
}) => {
    const res = await axios.post(
        `${API}/send`,
        data,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    return res.data;
};

export const getChatList = async () => {
    const res = await axios.get(`${API}/chat-list`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });

    return res.data;
};