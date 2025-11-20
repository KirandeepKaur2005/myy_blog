import 'dotenv/config';
import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

const adminLogin = async(req, res) => {
    // console.log("Incoming body:", req.body);
    try {
        const {email, password} = await req.body;

        if (email.trim().length === 0 || password.trim().length === 0){
            return res.json({success: false, message: "Both email and password are required"});
        }

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Invalid Credentials"});
        }

        const token = jwt.sign({email} , process.env.SECRET_KEY);

        console.log("Success")
        res.json({success: true, token});
    } 
    catch (error) {
        console.log("admin login fail")
        return res.json({success: false, message: error.message});
    }
}

const getAllBlogsAdmin = async(req, res) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success: true, blogs});
    } catch (error) {
        console.log("admin blog fetch fail")
        return res.json({success: false, message: error.message});
    }
}

const getAllComments = async(req, res) => {
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt: -1});
        res.json({success: true, comments});
    } catch (error) {
        console.log("admin comments fetch fail")
        return res.json({success: false, message: error.message});
    }
}

const getDashboard = async(req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false});
        const comments = await Comment.countDocuments();

        const dashboardData = {
            blogs,
            comments, 
            drafts,
            recentBlogs
        }

        res.json({success: true, dashboardData});

    } catch (error) {
        console.log("getDashboard fail");
        return res.json({success: false, message: error.message});
    }
}

const deleteCommentById = async(req, res) => {
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success: true, message: "Comment deleted successfully"});
    } catch (error) {
        console.log("delete comment by id fail");
        return res.json({success: false, message: error.message});
    }
}

const approveCommentById = async(req, res) => {
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        res.json({success: true, message: "Comment approved successfully"});
    } catch (error) {
        console.log("comment approve by id fail");
        return res.json({success: false, message: error.message});
    }
}

export {adminLogin, getAllBlogsAdmin, getAllComments, getDashboard, deleteCommentById, approveCommentById};