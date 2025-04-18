// src/Context/blog-context.js
import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    try {

      const res = await axios.get(`${API}/api/posts`);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  const getPublishedPosts = () => posts.filter(post => post.status === "published");
  const getDraftPosts = () => posts.filter(post => post.status === "draft");

  // Delete post function
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${API}/api/posts/${postId}`);
      if (response.status === 200) {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <BlogContext.Provider value={{ posts, fetchPosts, getPublishedPosts, getDraftPosts, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
