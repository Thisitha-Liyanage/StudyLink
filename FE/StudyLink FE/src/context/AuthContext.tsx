import { createContext, useEffect, useState } from "react";
import { getMyDetails } from "../service/auth";

type User = {
    username: string;
    email: string;
    contactNumber: string;
    university: string;
    bio: string;
    profilePic: string;
};

type UserContextType = {
    user: User | null;
    loading: boolean;
    refreshUser: () => void;
};

export const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    refreshUser: () => {},
});

export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await getMyDetails();
            setUser(data);
        } catch (err) {
            console.error("Failed to load user", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                refreshUser: fetchUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};