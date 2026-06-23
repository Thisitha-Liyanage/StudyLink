import axios from "axios";

import api from "./api";

const getToken = () => localStorage.getItem("token");

// 📥 GET CONVERSATION
export const getMessages = async (receiverId: string) => {
    const res = await axios.get(
        `${api}/conversation/${receiverId}`,
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
        `${api}/send`,
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
    const res = await axios.get(`${api}/chat-list`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });

    return res.data;
};