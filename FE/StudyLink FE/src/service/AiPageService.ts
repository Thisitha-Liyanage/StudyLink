import api from "./api";

export const sendAIMessage = async (message: string) => {
  const res = await api.post("/ai/chat", {
    message,
  });

  return res.data;
};

export const summarizeNote = async (content: string) => {
  const res = await api.post("/api/ai/summarize", {
    message: content,
  });

  return res.data.summary;
};