import fs from 'fs';  
import path from 'path';




const POSTS_PATH = path.join('./db/dummy-posts.json');
const USERS_PATH = path.join('./db/dummy-users.json');

const posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8'));
const users = JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));

const LOGGED_IN_USER = 'e1';


export const getPostAuthor = (authorId) => {
  const user = users.find(user => user.id === authorId);
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    occupation: user.occupation,
  };
}

export const getPosts = () => {
  return posts;
}

export const getLoggedInUser = () => {
  return users.find(user => user.id === LOGGED_IN_USER);
}

