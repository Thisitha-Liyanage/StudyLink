import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    FileText,
    StickyNote,
    LogOut,
} from "lucide-react";

const Sidebar = () => {
    const linkClass = ({ isActive }: any) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
            ? "bg-green-500 text-black font-semibold"
            : "text-gray-300 hover:bg-green-500/10 hover:text-green-400"
        }`;

    return (
        <aside className="w-64 h-screen bg-black border-r border-green-500/20 p-6 flex flex-col justify-between">

            {/* Top */}
            <div>
                <h1 className="text-2xl font-bold text-green-400 mb-10">
                    StudyLink
                </h1>

                <nav className="space-y-3">


                    {/* Dashboard */}
                    <NavLink
                        to="/admin"
                        end
                        className={linkClass}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    {/* Users */}
                    <NavLink to="/admin/users" className={linkClass}>
                        <Users size={20} />
                        Users
                    </NavLink>
                </nav>
            </div>

            {/* Logout */}
            <button className="flex items-center justify-center gap-2 bg-green-500 text-black font-semibold py-3 rounded-xl hover:bg-green-400 transition">
                <LogOut size={18} />
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;