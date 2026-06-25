import axios from "axios";
import api from "./api"; 

const getToken = () => localStorage.getItem("token");

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
});


export const getMessages = async (receiverId: string) => {

    const res = await axios.get(
        `${api}/messages/conversation/${receiverId}`,
        getAuthHeaders()
    );
    return res.data;
};


export const sendMessage = async (data: {
    receiverId: string;
    message: string;
}) => {

    const res = await axios.post(
        `${api}/messages`,
        data,
        getAuthHeaders()
    );
    return res.data;
};

// 📂 GET CHAT LIST
export const getChatList = async () => {
    const res = await axios.get(
        `${api}/messages/chat-list`,
        getAuthHeaders()
    );
    return res.data;
};