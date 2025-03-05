import Post from '../model/post.js';
import User from '../model/user.js';
import mongoose from 'mongoose';
// import { validationResult } from 'express-validator';


export const getAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const author = await User.findById(authorId);
    if (!author) {
      const error = new Error("Author not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ author });
  } catch (error) {
    next(error);
  }
};

export const getFeed = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 4;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    

    res.status(200).json({ message: "Fetched posts successfully", posts, totalItems });
    
  } catch (error) {
    next(error);
  }
};


export const createPost = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    const imageUrl = req.file ? req.file.path.replace("\\", "/") : null;

    if (!title || !content || !author || !imageUrl) {
      const error = new Error("Missing required fields");
      error.statusCode = 422;
      throw error;
    }

    const newPost = new Post({
      title,
      content,
      author,
      imageUrl,
      createdAt: new Date(),
    });

    const savedPost = await newPost.save();

    // Optionally update the user's posts
    const user = await User.findById(author);
    if (user) {
      user.posts.push(savedPost._id);
      await user.save();
    }

    res.status(201).json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    if (title) post.title = title;
    if (content) post.content = content;

    const updatedPost = await post.save();
    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    next(error);
  }
};


export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully", post });
  } catch (error) {
    next(error);
  }
};
