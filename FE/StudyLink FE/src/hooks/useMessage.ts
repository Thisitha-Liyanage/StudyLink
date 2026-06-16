import { useContext } from "react";
import MessageContext from "../context/MessageContext";

export const useMessage = () => {
    const context = useContext(MessageContext);

    return context;
};