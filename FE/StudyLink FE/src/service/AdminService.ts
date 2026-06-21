import api from "./api";

export const getAllUsers = async () => {
    const response = await api.get("/admin/all");
    return response.data;
};

export const getDashboardStats = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};