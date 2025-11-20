import express, { Router } from 'express'
import { addBlog, addComments, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js'
import upload from '../middlewares/multer.js';
import auth from '../middlewares/auth.js';

const blogRouter = Router();

// BLOCK GET /create FIRST
blogRouter.get("/create", (req, res) => {
  return res.status(405).json({
    success: false,
    message: "GET not allowed on /create. Use POST."
  });
});

//<---- GET routes ----> 
blogRouter.get("/get-all-blogs", getAllBlogs);
blogRouter.post("/get-blog-comments", getBlogComments);

//<---- POST routes ----> 
blogRouter.post("/create", upload.single('image'), auth, addBlog);
blogRouter.post("/delele-blog", auth, deleteBlogById);
blogRouter.post("/toggle-isPublished", auth, togglePublish);
blogRouter.post("/add-comment", addComments);

blogRouter.post("/generate", auth, generateContent);

// dynamic route LAST
blogRouter.get("/:blogId", getBlogById);


export default blogRouter;