import { useEffect, useState } from "react";
import { getMyDetails } from "../../service/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getDashboardStatsThunk } from "../../redux/slices/AdminSlice";

const AdminHomePage = () => {
  const dispatch = useAppDispatch();

  const { userCount, noteCount } = useAppSelector(
    (state) => state.admin
  );

  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const data = await getMyDetails();
        setAdmin(data);
      } catch (error) {
        console.error("Failed to load admin details", error);
      }
    };

    loadAdmin();
    dispatch(getDashboardStatsThunk());
  }, [dispatch]);

  const stats = [
    {
      title: "All Users",
      count: userCount,
    },
    {
      title: "All Notes",
      count: noteCount,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-900 text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-green-400">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Manage users and study notes
          </p>
        </div>

        <div className="flex items-center gap-3 bg-black/40 border border-green-500/20 px-4 py-2 rounded-xl">

          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
            {admin?.username?.charAt(0).toUpperCase() || "A"}
          </div>

          <div>
            <p className="text-sm text-gray-400">Welcome</p>
            <h3 className="font-semibold text-green-400">
              {admin?.username || "Loading..."}
            </h3>
          </div>

        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-black/40 border border-green-500/20 rounded-2xl p-6"
          >
            <p className="text-gray-400 text-sm">{item.title}</p>
            <h2 className="text-4xl font-bold mt-2 text-green-400">
              {item.count}
            </h2>
          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminHomePage;