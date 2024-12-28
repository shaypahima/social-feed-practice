import Post from '../model/post.js';
import User from '../model/user.js';

export const getAuthor = async (req, res, next) => {
  const { authorId } = req.params;
  const author = await User.findById(authorId);
  res.status(200).json({ author });
}

export const getFeed = async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({ posts });
}

export const createPost = async (req, res, next) => {
  const post = req.body;
  const newPost = await Post.create(post);
  res.status(200).json({ post: newPost });
}


