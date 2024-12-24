import { getPostAuthor, getPosts } from "../db/dummy.js";



export const getAuthor = (req, res, next) => {
  const { authorId } = req.params;
  const author = getPostAuthor(authorId);
  res.status(200).json({ author });
}

export const getFeed = (req, res, next) => {
  const posts = getPosts();
  res.status(200).json({ posts });
}

