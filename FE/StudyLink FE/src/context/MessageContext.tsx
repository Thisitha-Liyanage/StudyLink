import { createContext, useState } from "react";
import type { ReactNode } from "react";

type MessageContextType = {
    selectedUser: any;
    setSelectedUser: React.Dispatch<React.SetStateAction<any>>;
};

const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <MessageContext.Provider value={{ selectedUser, setSelectedUser }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageContext;