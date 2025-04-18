const express = require("express");
const upload = require("../middleware/upload");
const {
  create,
  readAll,
  read,
  update,
  delete: deletePost,
  detail,
} = require("../controllers/BlogController");

const router = express.Router();

router.post("/create", upload.single("image"), create);
router.get("/", readAll);
router.get("/:id", read);
router.get("/posts/:id", detail);
router.put("/:id", upload.single("image"), update);
router.delete("/:id", deletePost);

module.exports = router;
