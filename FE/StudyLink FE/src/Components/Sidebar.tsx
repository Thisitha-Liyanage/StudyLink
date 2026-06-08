import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const linkClass = ({ isActive }: any) =>
    `block px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-green-500 text-black font-semibold"
        : "text-gray-300 hover:text-green-400 hover:bg-green-500/10"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login"); 
  };

  return (
    <aside className="w-64 h-full bg-black/60 border-r border-green-500/20 p-6 flex flex-col justify-between">

      <div>
        <h2 className="text-xl font-bold text-green-500 mb-8">
          StudyLink
        </h2>

        <nav className="space-y-2">

          <NavLink to="/student" end className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/student/posts" className={linkClass}>
            Posts
          </NavLink>

          <NavLink to="/student/messages" className={linkClass}>
            Messages
          </NavLink>

          <NavLink to="/student/notes" className={linkClass}>
            Notes
          </NavLink>

          <NavLink to="/student/ai" className={linkClass}>
            Chat With AI
          </NavLink>

        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-green-500 text-black font-semibold py-2 rounded-lg hover:bg-green-400"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;