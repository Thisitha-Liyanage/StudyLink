import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Message {
    _id: string;
    message: string;
    senderId: string;
    receiverId: string;
}

interface MessageState {
    selectedUser: any;
    messages: Message[];
}

const initialState: MessageState = {
    selectedUser: null,
    messages: [],
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setSelectedUser: (state, action: PayloadAction<any>) => {
            state.selectedUser = action.payload;
        },

        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },

        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },

        clearMessages: (state) => {
            state.messages = [];
        },
    },
});

export const {
    setSelectedUser,
    setMessages,
    addMessage,
    clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;