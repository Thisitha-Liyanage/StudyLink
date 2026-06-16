import { createContext, useState } from "react";

const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <MessageContext.Provider value={{ selectedUser, setSelectedUser }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageContext;