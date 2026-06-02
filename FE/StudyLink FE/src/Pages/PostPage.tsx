import { Heart, MessageCircle, Plus, Search } from "lucide-react";

const PostPage = () => {
    return (
        <div className="min-h-screen text-white">

            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8">

                {/* Search */}
                <div className="relative w-[400px]">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                    />

                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-[#1A1D29] border border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {/* Add Post Button */}
                    <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 transition px-5 py-3 rounded-2xl font-semibold">
                        <Plus size={20} />
                        Add Post
                    </button>
                    
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-3 gap-6">

                {[1, 2, 3, 4, 5, 6].map((post) => (
                    <div
                        key={post}
                        className="bg-[#1A1D29] border border-gray-800 rounded-2xl p-5 hover:border-blue-500/50 transition duration-300"
                    >

                        {/* User */}
                        <div className="flex items-center justify-between mb-5">

                            <div className="flex items-center gap-3">

                                {/* Avatar */}
                                <img
                                    src="https://i.pravatar.cc/100"
                                    alt="user"
                                    className="w-11 h-11 rounded-full object-cover"
                                />

                                {/* User Info */}
                                <div>
                                    <h3 className="font-semibold text-white">
                                        Post 1 User Name
                                    </h3>

                                    <p className="text-xs text-gray-400">
                                        2 hours ago
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Content */}
                        <div className="min-h-[140px]">
                            <p className="text-gray-300 leading-relaxed">
                                content
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-700 my-4"></div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">

                            <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition">
                                <Heart size={20} />
                                <span>Like</span>
                            </button>

                            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
                                <MessageCircle size={20} />
                                <span>Comment 4</span>
                            </button>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default PostPage;