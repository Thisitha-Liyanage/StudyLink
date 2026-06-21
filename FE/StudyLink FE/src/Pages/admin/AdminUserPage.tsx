import { Eye, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../service/AdminService";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Load all users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };

    loadUsers();
  }, []);

  // Show all users again when search is cleared
  useEffect(() => {
    if (!search.trim()) {
      setFilteredUsers(users);
    }
  }, [search, users]);

  // Search when Enter is pressed
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const result = users.filter(
        (user) =>
          user.username
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          user.email
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );

      setFilteredUsers(result);
    }
  };

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
          <span className="font-semibold">
            Total Users: {filteredUsers.length}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-black/40 border border-green-500/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <Search className="text-green-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search users and press Enter..."
          className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
        />
      </div>

      {/* Table */}
      <div className="bg-black/40 border border-green-500/20 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-500 text-black">
            <tr>
              <th className="text-left px-6 py-4">Username</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Contact Number</th>
              <th className="text-left px-6 py-4">University</th>
              <th className="text-center px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-green-500/10 hover:bg-green-500/5 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {user.username}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {user.contactNumber}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {user.university || "N/A"}
                  </td>

                  <td className="px-6 py-4 flex justify-center">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="flex items-center gap-2 bg-green-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-400 transition"
                    >
                      <Eye size={18} />
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

      {/* Profile Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-[#1A1D29] border border-green-500/20 rounded-2xl p-6 w-[500px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-green-400">
                Student Profile
              </h2>

              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <img
                src={
                  selectedUser.profilePic ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
              />

              <h3 className="text-2xl font-bold mt-4">
                {selectedUser.username}
              </h3>

              <span className="text-green-400 text-sm mt-1">
                {selectedUser.role}
              </span>
            </div>

            {/* User Details */}
            <div className="mt-6 space-y-4">

              <div className="bg-black/30 p-4 rounded-xl">
                <p className="text-green-400 font-semibold">
                  Email
                </p>
                <p>{selectedUser.email}</p>
              </div>

              <div className="bg-black/30 p-4 rounded-xl">
                <p className="text-green-400 font-semibold">
                  Contact Number
                </p>
                <p>{selectedUser.contactNumber}</p>
              </div>

              <div className="bg-black/30 p-4 rounded-xl">
                <p className="text-green-400 font-semibold">
                  University
                </p>
                <p>
                  {selectedUser.university || "Not provided"}
                </p>
              </div>

              <div className="bg-black/30 p-4 rounded-xl">
                <p className="text-green-400 font-semibold">
                  Bio
                </p>
                <p>
                  {selectedUser.bio || "No bio available"}
                </p>
              </div>

              <div className="bg-black/30 p-4 rounded-xl">
                <p className="text-green-400 font-semibold">
                  Skills
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedUser.skills?.length > 0 ? (
                    selectedUser.skills.map(
                      (skill: string, index: number) => (
                        <span
                          key={index}
                          className="bg-green-500 text-black px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      )
                    )
                  ) : (
                    <p>No skills added</p>
                  )}
                </div>
              </div>

              <div className="bg-black/30 p-4 rounded-xl">
                <p className="text-green-400 font-semibold">
                  Account Created
                </p>
                <p>
                  {new Date(
                    selectedUser.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-green-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-green-400"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUsersPage;