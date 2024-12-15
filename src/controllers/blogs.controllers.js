import Blogs from "../models/blogs.models.js";
import mongoose from "mongoose";


// add blog
const addBlog = async (req, res) => {
    const {title, description} = req.body
    if (!title || !description) {
        res.status(400).json({
            message: "title and description is required"
        })
        return;
    }
    const addblog = await Blogs.create({
        title, description
    })
    res.status(200).json({
        message: "user added in database successfully"
    })
}


// get all blogs
const allBlogs = async (req, res) => {
    const blogs = await Blogs.find({})
    if (!blogs) {
        res.status(400).json({
            messaeg: "blogs not found"
        })
    }
    res.status(201).json({
        message: "blogs received successfully",
        Blogs: blogs
    })
}


// get single blog
const singleBlog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "this id is not a mongodb id"

        })
    }
    const blog = await Blogs.findById(id)
    req.status(201).json({
        message: "single blog found",
        blog
    })

}
// delete blog
const deleteBlog = async (req, res) => {
    const { id } = req.params; // Get id from the request params

    // Validate the provided id to make sure it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "No such todos" });
    }

    // Attempt to find and delete the todo item by the provided id
    const blog = await Blogs.findByIdAndDelete(id);

    // If the todo is not found, return a 400 error
    if (!blog) {
        return res.status(400).json({
            error: "No blog found",
        });
    }

    // If the todo is deleted successfully, return a success message
    return res.status(200).json({
        message: "blog deleted successfully",
    });
};


//   edit todo
const editBlog = async (req, res) => {
    const { id } = req.params; // Get id from the request params
    const [title, description] = req.body
    // Validate the provided id to make sure it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "No blogs found" });
    }

    // Attempt to find and delete the todo item by the provided id
    const updateBlog = await Blogs.findByIdAndUpdate(
        id,
        {
            title, description
        },
        {
            new: true
        }
    );

    // If the blog is not found, return a 400 error
    if (!blog) {
        return res.status(400).json({
            error: "no blog found for update",
        });
    }

    // If the todo is deleted successfully, return a success message
    return res.status(200).json({
        message: "blog updates successfully",
        updateBlog
    });
};



export {singleBlog,addBlog,editBlog,deleteBlog,allBlogs}