import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/adminController.js";
import auth from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/comments', auth, getAllComments);
adminRouter.get('/blogs', getAllBlogsAdmin);
adminRouter.post('/delete-comment', deleteCommentById);
adminRouter.post('/approve-comment', approveCommentById);
adminRouter.get('/dashboard', getDashboard);

export default adminRouter;