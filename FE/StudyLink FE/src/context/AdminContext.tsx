import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getMyDetails } from "../service/auth";

interface AdminContextType {
  admin: any;
  setAdmin: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const data = await getMyDetails();
        setAdmin(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAdmin();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin,
        loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdmin must be used inside AdminProvider"
    );
  }

  return context;
};