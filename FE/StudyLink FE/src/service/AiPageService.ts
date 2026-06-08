import api from "./api";

export const sendAIMessage = async (message: string) => {
  const res = await api.post("/ai/chat", {
    message,
  });

  return res.data;
};