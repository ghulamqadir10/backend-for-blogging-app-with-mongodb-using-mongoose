import { singleBlog, addBlog, editBlog, deleteBlog, allBlogs } from "../controllers/blogs.controllers/js"
import express from "express";
import { upload } from "../middleware/multer.midleware";

const router = express.Router();
router.get("/allblogs", allBlogs)
router.get("/singleblog/:id", singleBlog)
router.post("/addblog", upload.single("blogImage"), addBlog)
router.delete("/deleteblog/:id", deleteBlog)
router.put("/editblog/:id", editBlog)


export default router;