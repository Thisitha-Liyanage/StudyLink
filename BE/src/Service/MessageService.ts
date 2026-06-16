import Message from "../Models/Message";
import { UserModel } from "../Models/User";

export const sendMessageService = async (
    senderId: string,
    receiverId: string,
    message: string
) => {
    const conversationId =
        senderId < receiverId
            ? `${senderId}_${receiverId}`
            : `${receiverId}_${senderId}`;

    const newMessage = await Message.create({
        conversationId,
        senderId,
        receiverId,
        message,
    });

    return newMessage;
};

export const getSentMessagesService = async (
    userId: string
) => {
    return await Message.find({
        senderId: userId,
    }).sort({ createdAt: -1 });
};

export const getReceivedMessagesService = async (
    userId: string
) => {
    return await Message.find({
        receiverId: userId,
    }).sort({ createdAt: -1 });
};


export const getChatListService = async (userId: string) => {
    const messages = await Message.find({
        $or: [
            { senderId: userId },
            { receiverId: userId }
        ]
    }).sort({ createdAt: -1 });

    const chats = [];

    const processedUsers = new Set();

    for (const msg of messages) {
        const otherUserId =
            msg.senderId.toString() === userId
                ? msg.receiverId.toString()
                : msg.senderId.toString();

        if (processedUsers.has(otherUserId)) continue;

        processedUsers.add(otherUserId);

        const user = await UserModel.findById(otherUserId).select(
            "username profilePic university"
        );

        chats.push({
            userId: otherUserId,
            username: user?.username,
            profilePic: user?.profilePic,
            university: user?.university,
            lastMessage: msg.message,
            conversationId: msg.conversationId,
        });
    }

    return chats;
};

