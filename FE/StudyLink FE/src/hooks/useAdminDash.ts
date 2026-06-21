import { useAdmin } from "../context/AdminContext";

export const useNotes = () => {
  const context = useAdmin();

  if (!context) {
    throw new Error(
      "useNotes must be used within AdminProvider"
    );
  }

  return context;
};