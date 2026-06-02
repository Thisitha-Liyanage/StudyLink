import {
  Users,
  FileText,
  StickyNote,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const AdminHomePage = () => {
  const stats = [
    {
      title: "All Users",
      count: 1250,
      icon: <Users size={28} />,
    },
    {
      title: "All Posts",
      count: 540,
      icon: <FileText size={28} />,
    },
    {
      title: "All Notes",
      count: 320,
      icon: <StickyNote size={28} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white p-6">

      {/* Top Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-green-400">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Manage users, posts and study notes
          </p>
        </div>

        <div className="flex items-center gap-3 bg-black/40 border border-green-500/20 px-4 py-2 rounded-xl">
          <img
            src="https://i.pravatar.cc/40"
            alt="admin"
            className="w-10 h-10 rounded-full border border-green-500"
          />

          <div>
            <p className="text-sm text-gray-400">Welcome</p>
            <h3 className="font-semibold text-green-400">
              Admin User
            </h3>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-black/40 border border-green-500/20 rounded-2xl p-6 hover:border-green-400 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">{item.title}</p>
                <h2 className="text-4xl font-bold mt-2 text-green-400">
                  {item.count}
                </h2>
              </div>

              <div className="bg-green-500/10 p-4 rounded-xl text-green-400">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-black/40 border border-green-500/20 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-green-400 mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-900 rounded-xl p-4 flex justify-between">
            <span>New student registered</span>
            <span className="text-gray-400 text-sm">2 mins ago</span>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 flex justify-between">
            <span>New note uploaded</span>
            <span className="text-gray-400 text-sm">10 mins ago</span>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 flex justify-between">
            <span>New post created</span>
            <span className="text-gray-400 text-sm">20 mins ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;