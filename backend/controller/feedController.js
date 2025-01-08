import Post from '../model/post.js';
import User from '../model/user.js';
import mongoose from 'mongoose';
import fs from 'fs';


export const getAuthor = async (req, res, next) => {
  const { authorId } = req.params;
  const author = await User.findById(authorId);
  res.status(200).json({ author });
}

export const getFeed = async (req, res, next) => {
  const posts = await Post.find();
  posts.forEach(post => { post.imageUrl = '/images/SpongeBob.png' });

  res.status(200).json({ posts });
}

export const createPost = async (req, res, next) => {
  const post = req.body;
  post.author = new mongoose.Types.ObjectId(post.author);
  console.log(post, "Post");
  const newPost = await Post.create(post);
  res.status(200).json({ post: newPost });
}

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  res.status(200).json({ post });
}

