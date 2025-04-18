var express = require('express');
var router = express.Router();
const connectDB = require('../Config/db');
const cors = require("cors");
const path = require("path");
router.use(cors());
router.use("/uploads", express.static(path.join(__dirname, "uploads")));
const authRoutes = require("../routes/authRoutes");
const blogRoutes = require("../routes/blogRoutes");
connectDB();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Simple data route */
router.get('/data', function(req, res, next) {
  res.send({ status: 0, mesg: "This is the data message" });
});

/* POST route to save data */
router.use("/api/auth", authRoutes);
router.use("/api/posts", blogRoutes);
module.exports = router;
