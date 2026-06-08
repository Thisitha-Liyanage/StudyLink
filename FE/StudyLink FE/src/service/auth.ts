import api from "./api";

export const login = async (
  email: string,
  password: string
) => {
  const res = await api.post("/users/login", {
    email,
    password,
  });

  localStorage.setItem("token", res.data.token);

  return res.data;
};

export const register = async (
  username: string,
  email: string,
  password: string,
  contactNumber: string
) => {
  const res = await api.post("/users/register", {
    username,
    email,
    password,
    contactNumber,
  });

  return res.data;
};

export const getMyDetails = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateProfile = async (data: any) => {
  const res = await api.put("/users/me", data);
  return res.data;
};


export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "zeii80ox");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dkmacignl/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  console.log("Cloudinary response:", data);

  if (!res.ok) {
    throw new Error(data.error?.message || "Upload failed");
  }

  if (!data.secure_url) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.secure_url;
};