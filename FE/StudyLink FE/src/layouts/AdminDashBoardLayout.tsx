import { Outlet } from "react-router-dom";
import Sidebar from "../Components/AdminSidebar";

const AdminDashboardLayout = () => {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-950 via-black to-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;