import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    LogOut,
} from "lucide-react";

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
            ? "bg-green-500 text-black font-semibold"
            : "text-gray-300 hover:bg-green-500/10 hover:text-green-400"
        }`;

    return (
        <aside className="w-64 h-screen bg-black border-r border-green-500/20 p-6 flex flex-col justify-between">

            <div>
                <h1 className="text-2xl font-bold text-green-400 mb-10">
                    StudyLink Admin
                </h1>

                <nav className="space-y-3">
                    <NavLink to="/admin" end className={linkClass}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/users" className={linkClass}>
                        <Users size={20} />
                        Users
                    </NavLink>
                </nav>
            </div>

            <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-green-500 text-black font-semibold py-3 rounded-xl hover:bg-green-400 transition"
            >
                <LogOut size={18} />
                Logout
            </button>

        </aside>
    );
};

export default AdminSidebar;