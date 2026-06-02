import { Search, Send, Phone, Video, MoreVertical } from "lucide-react";

const MessagesPage = () => {
    return (
        <div className="h-[90vh] flex gap-6 text-white">

            {/* Left Sidebar */}
            <div className="w-[350px] bg-[#1A1D29] border border-gray-800 rounded-2xl p-5 flex flex-col">

                {/* Search */}
                <div className="relative mb-5">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                    />

                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full bg-black/30 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Chat List */}
                <div className="space-y-3 overflow-y-auto">

                    {[
                        {
                            name: "Jane Doe"
                        },
                        {
                            name: "Alex Johnson"
                            
                        },
                        {
                            name: "UI/UX Group"
                        },
                        {
                            name: "Gaming Community"
                        },
                    ].map((chat, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-black/20 hover:bg-green-500/10 transition p-3 rounded-xl cursor-pointer"
                        >

                            <div className="flex items-center gap-3">

                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-gray-700"></div>

                                {/* Info */}
                                <div>
                                    <h3 className="font-semibold text-white">
                                        {chat.name}
                                    </h3>

                                    <p className="text-sm text-gray-400">
                                        {chat.msg}
                                    </p>
                                </div>
                            </div>

                            {/* Time */}
                            <span className="text-xs text-gray-500">
                                {chat.time}
                            </span>
                        </div>
                    ))}

                </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1 bg-[#1A1D29] border border-gray-800 rounded-2xl flex flex-col">

                {/* Chat Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-800">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-full bg-gray-700"></div>

                        <div>
                            <h2 className="font-semibold text-lg">
                                Jane Doe
                            </h2>

                            
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 text-gray-400">

                        

                        <button className="hover:text-green-400 transition">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-5 space-y-4 overflow-y-auto">

                    {/* Received */}
                    <div className="flex">
                        <div className="bg-black/30 border border-gray-700 px-4 py-3 rounded-2xl max-w-[300px]">
                            <p className="text-sm text-gray-200">
                                Hey, did you finish the UI design?
                            </p>
                        </div>
                    </div>

                    {/* Sent */}
                    <div className="flex justify-end">
                        <div className="bg-green-500 text-black px-4 py-3 rounded-2xl max-w-[300px]">
                            <p className="text-sm">
                                Yes, I’ll send it in a few minutes.
                            </p>
                        </div>
                    </div>

                    {/* Received */}
                    <div className="flex">
                        <div className="bg-black/30 border border-gray-700 px-4 py-3 rounded-2xl max-w-[300px]">
                            <p className="text-sm text-gray-200">
                                Great 👍
                            </p>
                        </div>
                    </div>

                </div>

                {/* Input */}
                <div className="p-5 border-t border-gray-800">

                    <div className="flex items-center gap-4">

                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-black/30 border border-gray-700 rounded-xl py-3 px-4 text-white outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button className="bg-green-500 hover:bg-green-400 transition p-3 rounded-xl text-black">
                            <Send size={20} />
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default MessagesPage;