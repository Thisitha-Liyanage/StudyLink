import { useEffect, useState } from "react";
import { getMyDetails } from "../../service/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const data = await getMyDetails();
                setUser(data);
            } catch (err) {
                console.error("Failed to load user:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="text-white flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="space-y-8 text-white">

            {/* Top Bar */}
            <div className="flex justify-between items-center">

                <input
                    type="text"
                    placeholder="Search friends..."
                    className="w-1/2 bg-black/40 border border-gray-700 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <div className="flex items-center space-x-3">

                    <div className="text-sm text-gray-400">
                        Welcome back,{" "}
                        <span className="text-green-400 font-semibold">
                            {user?.username}
                        </span>
                    </div>

                    <img
                        src={user?.profilePic || "/default-avatar.png"}
                        className="w-10 h-10 rounded-full border border-green-500 object-cover cursor-pointer"
                        alt="profile"
                        onClick={() => navigate("/student/profile")}
                    />
                </div>
            </div>

            {/* Groups */}
            <section>
                <h3 className="text-lg font-semibold mb-4 text-green-400">
                    Your Groups
                </h3>

                <div className="grid grid-cols-3 gap-5">
                    {[
                        { name: "Study Group 1", members: 5, unread: 3 },
                        { name: "Study Group 2", members: 8, unread: 1 },
                        { name: "Design Group", members: 4, unread: 2 },
                    ].map((group) => (
                        <div
                            key={group.name}
                            className="bg-black/40 border border-gray-800 rounded-xl p-4 hover:border-green-500/50 hover:scale-[1.02] transition"
                        >
                            <h4 className="font-semibold text-green-400">
                                {group.name}
                            </h4>
                            <p className="text-sm text-gray-400 mt-2">
                                {group.members} members ·{" "}
                                <span className="text-green-400">
                                    {group.unread} unread
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Dashboard;