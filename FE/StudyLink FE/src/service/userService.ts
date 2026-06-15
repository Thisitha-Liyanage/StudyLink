import api from "./api";

export const searchUsers = async (username: string) => {
  const res = await api.get(
    `/users/search?username=${username}`
  );

  return res.data;
}; 