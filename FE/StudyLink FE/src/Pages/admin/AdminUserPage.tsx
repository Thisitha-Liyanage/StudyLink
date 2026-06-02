import { Eye, Search, Users } from "lucide-react";

const AdminUsersPage = () => {
  const users = [
    {
      id: 1,
      username: "john_doe",
      email: "john@gmail.com",
      contact: "+94 71 234 5678",
      age: 21,
    },
    {
      id: 2,
      username: "saman",
      email: "saman@gmail.com",
      contact: "+94 77 654 3210",
      age: 23,
    },
    {
      id: 3,
      username: "kavindu",
      email: "kavi@gmail.com",
      contact: "+94 76 987 4561",
      age: 20,
    },
    {
      id: 4,
      username: "nethmi",
      email: "nethmi@gmail.com",
      contact: "+94 75 444 8899",
      age: 22,
    },
  ];

  return (
    <div className="min-h-screen text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-green-400">
            Users Management
          </h1>

          <p className="text-gray-400 mt-1">
            Manage all registered users
          </p>
        </div>

        <div className="flex items-center gap-3 bg-black/40 border border-green-500/20 px-4 py-2 rounded-xl">
          <Users className="text-green-400" />
          <span className="font-semibold">Total Users: 4</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-black/40 border border-green-500/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <Search className="text-green-400" />

        <input
          type="text"
          placeholder="Search users..."
          className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
        />
      </div>

      {/* Table */}
      <div className="bg-black/40 border border-green-500/20 rounded-2xl overflow-hidden">

        <table className="w-full">

          {/* Table Head */}
          <thead className="bg-green-500 text-black">
            <tr>
              <th className="text-left px-6 py-4">Username</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Contact Number</th>
              <th className="text-left px-6 py-4">Age</th>
              <th className="text-center px-6 py-4">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-green-500/10 hover:bg-green-500/5 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {user.username}
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {user.email}
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {user.contact}
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {user.age}
                </td>

                <td className="px-6 py-4 flex justify-center">
                  <button className="flex items-center gap-2 bg-green-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-400 transition">
                    <Eye size={18} />
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;