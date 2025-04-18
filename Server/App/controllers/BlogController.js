const Post = require("../models/Post");

exports.create = async (req, res) => {
  try {
    const { title, content, status } = req.body;
    const image = req.file ? req.file.path : null; // Cloudinary provides a full URL as `path`

    const post = new Post({ title, content, status, image });
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

exports.readAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.read = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, content, status } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, status, image },
      { new: true }
    );

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
};


exports.delete = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

exports.detail = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
