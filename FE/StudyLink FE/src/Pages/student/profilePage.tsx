import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { updateProfile, uploadImage } from "../../service/auth";

const ProfilePage = () => {

    const { user, loading, refreshUser } = useAuth();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        contactNumber: "",
        university: "",
        bio: "",
        password: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
                contactNumber: user.contactNumber || "",
                university: user.university || "",
                bio: user.bio || "",
                password: "",
            });

            setPreviewImage(user.profilePic || "");
        }
    }, [user]);
    if (loading) {
        return (
            <div className="text-white flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-white flex justify-center items-center h-screen">
                No user found
            </div>
        );
    }

    return (
        <div className="text-white p-8 space-y-8">

            {/* PROFILE HEADER */}
            <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 flex items-center gap-6">

                <img
                    src={user.profilePic || "/default-avatar.png"}
                    className="w-24 h-24 rounded-full border border-green-500 object-cover"
                    alt="profile"
                />

                <div>
                    <h2 className="text-2xl font-bold text-green-400">
                        {user.username}
                    </h2>

                    <p className="text-gray-400">{user.email}</p>
                </div>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 gap-6">

                <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400">Contact Number</p>
                    <p className="text-white">{user.contactNumber || "Not set"}</p>
                </div>

                <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400">University</p>
                    <p className="text-white">{user.university || "Not set"}</p>
                </div>

                <div className="bg-black/40 border border-gray-800 rounded-xl p-4 col-span-2">
                    <p className="text-gray-400">Bio</p>
                    <p className="text-white">{user.bio || "No bio yet"}</p>
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4">

                <button
                    onClick={() => {
                        setFormData({
                            username: user.username || "",
                            email: user.email || "",
                            contactNumber: user.contactNumber || "",
                            university: user.university || "",
                            bio: user.bio || "",
                            password: "",
                        });

                        setShowModal(true);
                    }}
                    className="bg-green-500 text-black px-6 py-2 rounded-xl hover:bg-green-400 transition"
                >
                    Update Profile
                </button>

                <button
                    onClick={refreshUser}
                    className="border border-gray-600 text-gray-300 px-6 py-2 rounded-xl hover:bg-gray-800 transition"
                >
                    Refresh
                </button>

            </div>

            {/* UPDATE PROFILE MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

                    <div className="bg-[#1A1D29] border border-gray-700 rounded-2xl p-6 w-full max-w-lg">

                        <h2 className="text-2xl font-bold text-green-400 mb-6">
                            Update Profile
                        </h2>

                        <div className="space-y-4">

                            <div className="flex flex-col items-center gap-4">

                                <img
                                    src={
                                        previewImage ||
                                        user.profilePic ||
                                        "/default-avatar.png"
                                    }
                                    alt="Profile Preview"
                                    className="w-28 h-28 rounded-full border-2 border-green-500 object-cover shadow-lg"
                                />

                                <label
                                    htmlFor="profile-upload"
                                    className="
                                        cursor-pointer
                                        bg-green-500
                                        hover:bg-green-400
                                        text-black
                                        font-semibold
                                        px-5
                                        py-2
                                        rounded-xl
                                        transition
                                    "
                                >
                                    Change Profile Photo
                                </label>

                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];

                                        if (file) {
                                            setSelectedImage(file);
                                            setPreviewImage(URL.createObjectURL(file));
                                        }
                                    }}
                                />

                                {selectedImage && (
                                    <p className="text-sm text-green-400">
                                        {selectedImage.name}
                                    </p>
                                )}

                            </div>

                            <input
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-gray-700 rounded-lg p-3"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-gray-700 rounded-lg p-3"
                            />

                            <input
                                type="text"
                                placeholder="Contact Number"
                                value={formData.contactNumber}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        contactNumber: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-gray-700 rounded-lg p-3"
                            />

                            <input
                                type="text"
                                placeholder="University"
                                value={formData.university}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        university: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-gray-700 rounded-lg p-3"
                            />

                            <textarea
                                placeholder="Bio"
                                value={formData.bio}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        bio: e.target.value,
                                    })
                                }
                                rows={1}
                                className="w-full bg-black/30 border border-gray-700 rounded-lg p-3"
                            />

                            <input
                                type="password"
                                placeholder="New Password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-gray-700 rounded-lg p-3"
                            />

                        </div>

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2 border border-gray-600 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    try {
                                        let profilePic = user.profilePic || "";

                                        if (selectedImage) {
                                            profilePic = await uploadImage(selectedImage);
                                        }

                                        await updateProfile({
                                            ...formData,
                                            profilePic,
                                        });

                                        await refreshUser();
                                        setShowModal(false);
                                        setSelectedImage(null);
                                    } catch (err) {
                                        console.error("Update failed:", err);
                                    }
                                }}
                                className="px-5 py-2 bg-green-500 text-black rounded-lg font-semibold"
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default ProfilePage;