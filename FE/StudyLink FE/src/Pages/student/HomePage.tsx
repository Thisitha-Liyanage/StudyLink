const Dashboard = () => {
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
                    <div className="text-sm text-gray-400">Welcome back</div>
                    <div className="w-10 h-10 bg-green-500/20 border border-green-500 rounded-full" />
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
                                <span className="text-green-400">{group.unread} unread</span>
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Posts */}
            <section>
                <h3 className="text-lg font-semibold mb-4 text-green-400">
                    New Posts
                </h3>

                <div className="grid grid-cols-3 gap-5">
                    {[1, 2, 3].map((post) => (
                        <div
                            key={post}
                            className="bg-black/40 border border-gray-800 rounded-xl p-4 hover:border-green-500/50 hover:scale-[1.02] transition"
                        >
                            {/* User */}
                            <div className="flex items-center mb-3">
                                <div className="w-9 h-9 bg-gray-700 rounded-full mr-3" />
                                <div>
                                    <p className="font-semibold">Jane Doe</p>
                                    <p className="text-xs text-gray-400">2h ago</p>
                                </div>
                            </div>

                            {/* Content */}
                            <p className="text-sm text-gray-300 mb-3">
                                This is a sample post content for your dashboard UI.
                            </p>

                            {/* Actions */}
                            <div className="flex space-x-4 text-green-400 text-sm">
                                <span>❤️ 5</span>
                                <span>💬 14</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Dashboard;