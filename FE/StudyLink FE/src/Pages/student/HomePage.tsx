import { useEffect, useState } from "react";
import { getMyDetails } from "../../service/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchUsersThunk } from "../../redux/slices/userSlice";
import { getMyNotes } from "../../service/NoteService";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [myNotes, setMyNotes] = useState<any[]>([]);

    const { searchResults } = useAppSelector((state) => state.user);

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

        const fetchNotes = async () => {
            try {
                const notes = await getMyNotes();
                setMyNotes(notes.slice(0, 6)); // only 6 notes
            } catch (err) {
                console.error("Failed to load notes:", err);
            }
        };

        fetchUser();
        fetchNotes();
    }, []);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            dispatch(searchUsersThunk(search));
        }
    };

    if (loading) {
        return (
            <div className="text-white flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="space-y-8 text-white">

            {/* TOP BAR */}
            <div className="flex justify-between items-center relative">

                <input
                    type="text"
                    placeholder="Search friends..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                    className="w-1/2 bg-black/40 border border-gray-700 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* SEARCH RESULTS */}
                {searchResults.length > 0 && (
                    <div className="absolute top-14 left-0 w-1/2 bg-black/90 rounded-xl p-3 z-50">
                        {searchResults.map((u: any) => (
                            <div
                                key={u._id}
                                onClick={() => setSelectedUser(u)}
                                className="flex items-center gap-3 p-2 border-b border-gray-700 cursor-pointer hover:bg-black/50"
                            >
                                <img
                                    src={u.profilePic || "/default-avatar.png"}
                                    className="w-10 h-10 rounded-full object-cover"
                                />

                                <div>
                                    <p className="font-semibold">{u.username}</p>
                                    <p className="text-sm text-gray-400">{u.university}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* USER INFO */}
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

            {/* MY NOTES (6 CARDS) */}
            <section>
                <h3 className="text-lg font-semibold mb-4 text-blue-400">
                    My Notes
                </h3>

                <div className="grid grid-cols-3 gap-4">
                    {myNotes.map((note: any) => (
                        <div
                            onClick={() => navigate("/student/notes")}
                            className="cursor-pointer bg-black/40 border border-gray-700 rounded-xl p-4 hover:border-blue-400 hover:scale-[1.02] transition"
                        >
                            <h4 className="font-semibold text-blue-300">
                                {note.title}
                            </h4>

                            <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                                {note.content}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* POPUP MODAL */}
            {selectedUser && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={() => setSelectedUser(null)}
                >
                    <div
                        className="bg-[#1A1D29] w-[350px] rounded-2xl p-5 border border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <img
                                src={selectedUser.profilePic || "/default-avatar.png"}
                                className="w-20 h-20 rounded-full object-cover border border-green-500"
                            />

                            <h2 className="mt-3 text-xl font-bold">
                                {selectedUser.username}
                            </h2>

                            <p className="text-gray-400">
                                {selectedUser.university}
                            </p>
                        </div>

                        <div className="mt-5 flex flex-col gap-3">
                            <button
                                onClick={() =>
                                    navigate(`/student/chat/${selectedUser._id}`)
                                }
                                className="bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded-xl"
                            >
                                Send Message
                            </button>

                            <button
                                onClick={() => setSelectedUser(null)}
                                className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl"
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

export default Dashboard;