import {
  Heart,
  MessageCircle,
  Search,
  FileText,
  Plus,
} from "lucide-react";

const AdminPostsPage = () => {
  const posts = [
    {
      id: 1,
      username: "john_doe",
      content:
        "Just uploaded my Java OOP notes for semester finals 📚",
      likes: 120,
      comments: 24,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },

    {
      id: 2,
      username: "nethmi",
      content:
        "Anyone interested in joining our React study group?",
      likes: 87,
      comments: 15,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },

    {
      id: 3,
      username: "saman",
      content:
        "Shared new database design tutorial for beginners 🚀",
      likes: 65,
      comments: 10,
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    },
  ];

  return (
    <div className="min-h-screen text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-green-400">
            Posts Management
          </h1>

          <p className="text-gray-400 mt-1">
            Manage all student posts and activities
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="bg-black/40 border border-green-500/20 rounded-2xl p-4 mb-8 flex items-center gap-3">
        <Search className="text-green-400" />

        <input
          type="text"
          placeholder="Search posts..."
          className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
        />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 bg-black/40 border border-green-500/20 px-4 py-3 rounded-xl mb-8 w-fit">
        <FileText className="text-green-400" />
        <span className="font-semibold">
          Total Posts: {posts.length}
        </span>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-black/40 border border-green-500/20 rounded-2xl overflow-hidden hover:border-green-400 transition"
          >

            {/* Image */}
            <img
              src={post.image}
              alt="post"
              className="w-full h-56 object-cover"
            />

            {/* Content */}
            <div className="p-5">

              {/* User */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={`https://i.pravatar.cc/150?img=${post.id}`}
                  alt="user"
                  className="w-12 h-12 rounded-full border border-green-500"
                />

                <div>
                  <h3 className="font-semibold text-green-400">
                    {post.username}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Student Post
                  </p>
                </div>
              </div>

              {/* Post Text */}
              <p className="text-gray-300 mb-5">
                {post.content}
              </p>

              {/* Likes + Comments */}
              <div className="flex items-center gap-6 mb-5">

                <div className="flex items-center gap-2 text-pink-400">
                  <Heart size={20} />
                  <span>{post.likes} Likes</span>
                </div>

                <div className="flex items-center gap-2 text-blue-400">
                  <MessageCircle size={20} />
                  <span>{post.comments} Comments</span>
                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-3">

                <button className="flex-1 bg-green-500 text-black py-3 rounded-xl font-semibold hover:bg-green-400 transition">
                  View Post
                </button>

                <button className="flex-1 bg-red-500/20 text-red-400 border border-red-500/30 py-3 rounded-xl font-semibold hover:bg-red-500/30 transition">
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AdminPostsPage;