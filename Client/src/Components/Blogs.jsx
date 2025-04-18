import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendar as Calendar,
  FaUser  as User,
  FaArrowRight as ArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ import Link
import { motion } from "framer-motion"; // Import Framer Motion

export default function BlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios
      .get(`${API}/api/posts`)
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="blogs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Latest Blog Posts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest insights, industry trends, and expert advice.
          </p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                  initial={{ opacity: 0, y: 20 }} // Initial state
                  animate={{ opacity: 1, y: 0 }} // Animate to this state
                  transition={{ duration: 0.5 }} // Transition duration
                >
                  {/* Image */}
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  {/* Blog Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <User  className="h-4 w-4 mr-1 text-blue-500" />
                        <span>Admin</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors duration-200">
                      {blog.title}
                    </h3>
                    <div
                      className="text-gray-600 mb-4"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.content.length > 100
                            ? blog.content.substring(0, 100) + "..."
                            : blog.content,
                      }}
                    />

                    {/* ✅ Read More Link */}
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors duration-200"
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No blog posts available.
              </p>
            )}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="text-blue-600 border border-blue-600 rounded-lg px-6 py-3 hover:bg-blue-600 hover:text-white transition-colors duration-200">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
}