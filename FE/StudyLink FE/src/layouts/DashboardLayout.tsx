import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 bg-linear-to-br from-gray-950 via-black to-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;