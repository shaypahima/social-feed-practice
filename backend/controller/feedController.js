import { getPostAuthor, getPosts } from "../db/dummy.js";

let ID = 7

export const getAuthor = (req, res, next) => {
  const { authorId } = req.params;
  const author = getPostAuthor(authorId);
  res.status(200).json({ author });
}

export const getFeed = (req, res, next) => {
  const posts = getPosts();
  res.status(200).json({ posts });
}

export const createPost = (req, res, next) => {
  const post = req.body;
  const newPost = { ...post, id: `p${ID++}`, date: new Date().toISOString() };
  res.status(200).json({ post: newPost });
}

