import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBlog } from "../Context/blog-context";
import BlogForm from "../Components/Blogform";
import axios from "axios";

export default function Dashboard() {
  const { fetchPosts, getPublishedPosts, getDraftPosts, deletePost } = useBlog();
  const [activeTab, setActiveTab] = useState("create");
  const [editingPostId, setEditingPostId] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      fetchPosts();
    }
  }, [navigate, fetchPosts]);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    navigate("/login");
    try {
      await axios.post(`${API}/api/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleEditPost = (postId) => {
    setEditingPostId(postId);
    setActiveTab("create");
  };

  const handleSavePost = () => {
    setEditingPostId(null);
    setActiveTab("published");
    fetchPosts();
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(postId);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-blue-600 text-white p-4 flex flex-col">
        <div className="mb-6 p-4 bg-white shadow-md rounded-lg text-center text-gray-800">
          <h1 className="text-2xl font-bold mb-1">Blog Dashboard</h1>
          <p className="text-sm">Welcome, <span className="font-semibold text-blue-600">{user?.name || "User"}</span>!</p>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {["create", "published", "drafts"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => {
                    if (tab === "create") setEditingPostId(null);
                    setActiveTab(tab);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === tab ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  {tab === "create" && "Create Post"}
                  {tab === "published" && `Published (${getPublishedPosts().length})`}
                  {tab === "drafts" && `Drafts (${getDraftPosts().length})`}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6">
          <Link
            to="/"
            className="block w-full text-center px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 mb-2"
          >
            View Blog
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-md p-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {activeTab === "create" && (editingPostId ? "Edit Post" : "Create New Post")}
            {activeTab === "published" && "Published Posts"}
            {activeTab === "drafts" && "Draft Posts"}
          </h2>
        </header>

        <main className="flex-grow p-4 sm:p-6 bg-gray-100">
          {activeTab === "create" && (
            <BlogForm editingPostId={editingPostId} onSaved={handleSavePost} />
          )}
          {activeTab === "published" && (
            <PostList
              posts={getPublishedPosts()}
              handleEditPost={handleEditPost}
              handleDeletePost={handleDeletePost}
              label="Published"
            />
          )}
          {activeTab === "drafts" && (
            <PostList
              posts={getDraftPosts()}
              handleEditPost={handleEditPost}
              handleDeletePost={handleDeletePost}
              label="Draft"
            />
          )}
        </main>

        <footer className="p-4 bg-gray-900 text-center text-white text-sm">
          <p>&copy; {new Date().getFullYear()} Blog Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

function PostList({ posts, handleEditPost, handleDeletePost, label }) {
  const [readPostId, setReadPostId] = useState(null);

  const toggleReadPost = (postId) => {
    setReadPostId((prev) => (prev === postId ? null : postId));
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold mb-4">
        {label} Posts ({posts.length})
      </h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No {label.toLowerCase()} posts yet.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    {label === "Published"
                      ? `Created: ${new Date(post.createdAt).toLocaleString()}`
                      : `Last edited: ${new Date(post.updatedAt).toLocaleString()}`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEditPost(post._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleReadPost(post._id)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md cursor-pointer hover:bg-gray-700 transition text-sm"
                  >
                    {readPostId === post._id ? "Hide" : "Read"}
                  </button>
                </div>
              </div>

              {readPostId === post._id && (
                <div className="mt-4 p-4 bg-white border rounded-md text-gray-800">
                  <h4 className="text-base font-semibold mb-2">Post Content</h4>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
