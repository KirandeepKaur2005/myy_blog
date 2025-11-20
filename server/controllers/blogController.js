import ImageKit from '@imagekit/nodejs';
import fs from 'fs';
import Blog from '../models/Blog.js';
import 'dotenv/config';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';
import { response } from 'express';

const addBlog = async(req, res) => {
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if (!title || !description || !category || !imageFile){
            return res.json({success: false, message: "All fields are required"});
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await new ImageKit({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        const optimizedImageUrl = response.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'},
                {format: 'webp'},
                {width: '1280'}
            ]
        })

        const image = optimizedImageUrl;

        await Blog.create({title, subTitle, description, category, image, isPublished});

        res.json({success: true, message: "Blog added successfully"});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true});
        res.json({success: true, blogs});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const getBlogById = async(req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog){
            return res.json({success: false, message: "Blog not found while getting it by id"});
        }
        res.json({success: true, blog});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const deleteBlogById = async(req, res) => {
    try {
        const {id} = req.body;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        // delete comments associated with blog
        await Comment.deleteMany({ blog: id });
        if (!deletedBlog){
            return res.json({success: false, message: "Blog not found while deleting"});
        }
        res.json({success: true, message: "Blog deleted successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const togglePublish = async(req, res) => {
    try {
        const {id} = req.body;
        if (!id) {
            return res.json({ success: false, message: "No blog ID provided" });
        }
        const blog = await Blog.findById(id);
        if (!blog){
            return res.json({success: false, message: "Blog not found while toggling publish"});
        }
        blog.isPublished = !blog.isPublished;
        // if (blog.isPublished === 'true'){
        //     blog.isPublished = 'false';
        // }
        // else{
        //     blog.isPublished = 'true';
        // }
        await blog.save();
        res.json({success: true, message: "toggle updated successfully"});
    } catch (error) {
        console.log("toggle failed")
        res.json({success: false, message: error.message});
    }
}

const addComments = async(req, res) => {
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content});
        res.json({success: true, message: "Comment added for review"})
    } catch (error) {
        console.log("no comment added")
        res.json({success: false, message: error.message});
    }
}

const getBlogComments = async(req, res) => {
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, comments})
    } catch (error) {
        console.log("no blog comments fetched")
        res.json({success: false, message: error.message});
    }
}

const generateContent = async(req, res) => {
    try {
        const {prompt} = req.body;
        const content = await main(prompt + ' Generate blog content for this topic in simple text format');
        res.json({success: true, content});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export {addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublish, addComments, getBlogComments, generateContent};