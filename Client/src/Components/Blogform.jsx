import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

export default function BlogForm({ editingPostId, onSaved }) {
  const [form, setForm] = useState({ title: "", content: "", status: "draft", image: "" });
  const [image, setImage] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  const API_BASE = `${API}/api/posts`;
  const TINYMCE_API_KEY = "gmtuqea1tuo3ybywkz856qn23v6wzj5k5ygt7e28bl48a6yw";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/${editingPostId}`);
        setForm({
          title: data.title,
          content: data.content,
          status: data.status,
          image: data.image || "",
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (editingPostId) fetchPost();
    else setForm({ title: "", content: "", status: "draft", image: "" });
  }, [editingPostId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditorChange = (content) => {
    setForm((prev) => ({ ...prev, content }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("status", form.status);
    if (image) {
      formData.append("image", image); // Cloudinary will handle it
    } else {
      formData.append("image", form.image); // retain previous image if not changing
    }

    const method = editingPostId ? "put" : "post";
    const url = editingPostId ? `${API_BASE}/${editingPostId}` : `${API_BASE}/create`;

    try {
      await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSaved();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        {editingPostId ? "Edit Post" : "Create New Post"}
      </h2>

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter post title"
          className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <Editor
          apiKey={TINYMCE_API_KEY}
          value={form.content}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help",
          }}
          onEditorChange={handleEditorChange}
        />
      </div>

      {/* Image Upload Field */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        {form.image && !image && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Current image preview:</p>
            <img
              src={form.image}
              alt="Current"
              className="mt-1 w-full max-w-xs rounded-md border"
            />
          </div>
        )}
      </div>

      {/* Status Field */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {editingPostId ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
}
