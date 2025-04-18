import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCalendar as Calendar, FaUser  as User } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/api/posts/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading blog post...</p>;
  }

  if (!blog) {
    return <p className="text-center mt-10 text-red-500">Blog post not found.</p>;
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <Header />

      {/* Top Full-Width Image */}
      {blog.image && (
        <div className="w-full h-[500px] bg-gray-200 overflow-hidden relative">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 mt-10 mb-20">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          {blog.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1 text-blue-500" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <User  className="h-4 w-4 mr-1 text-blue-500" />
            <span>Admin</span>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      <Footer />
    </section>
  );
}