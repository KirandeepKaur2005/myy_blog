import express, { Router } from 'express'
import { addBlog, addComments, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js'
import upload from '../middlewares/multer.js';
import auth from '../middlewares/auth.js';

const blogRouter = Router();

//<---- GET routes ----> 
// blogs routes
blogRouter.get("/get-all-blogs", getAllBlogs);
blogRouter.post("/get-blog-comments", getBlogComments);   // comment routes

//<---- POST routes ----> 
// blogs routes
blogRouter.post("/create", upload.single('image'), auth, addBlog);
blogRouter.post("/delele-blog", auth, deleteBlogById);
blogRouter.post("/toggle-isPublished", auth, togglePublish);
// comment routes
blogRouter.post("/add-comment", addComments);

blogRouter.post("/generate", auth, generateContent);

// IMPORTANT FIX — prevent Vercel GET /add error
// blogRouter.get("/add", (req, res) => {
//   res.status(405).json({
//     success: false,
//     message: "Use POST /add instead of GET /add"
//   });
// });

blogRouter.get("/:blogId<^[0-9a-fA-F]{24}$>", getBlogById);

export default blogRouter;