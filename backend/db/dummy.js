const POSTS = [
  {
    id: 'p1',
    title: 'hi mom',
    content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    userId: 'e1',
    date: '2024-01-01'
  },
  {
    id: 'p2',
    title: 'hi dad',
    content: 'lorem ipsum dolor sit consectetur adipisicing elit. Quisquam, quos.',
    userId: 'e1',
    date: '2024-01-02'
  },
  {
    id: 'p3',
    title: 'hi sis',
    content: 'lorem ipsum dolo amet consectetur adipisicing elit. Quisquam, quos.',
    userId: 'e1',
    date: '2024-01-03'
  },
  {
    id: 'p4',
    title: 'hi friend',
    content: 'lorem ipsum dolo amet consectetur adipisicing elit. Quisquam, quos.',
    userId: 'e2',
    date: '2024-01-04'
  },
  {
    id: 'p5',
    title: 'hi family',
    content: 'lorem ipsum dolo amet consectetur adipisicing elit. Quisquam, quos.',
    userId: 'e2',
    date: '2024-01-05'
  },
  {
    id: 'p6',
    title: 'hi brother',
    content: 'lorem ipsum dolo amet consectetur adipisicing elit. Quisquam, quos.',
    userId: 'e2',
    date: '2024-01-06'
  }
]

const LOGGED_IN_USER = 'e1';

const USERS = [
  {
    id: 'e1',
    name: 'Shay Pahima',
    email: 'shphm4668@gmail.com',
    avatar: 'https://github.com/shaypahima.png',
    occupation: 'Fullstack Developer',
    location: 'San Francisco, CA',
    status: 'Here to be the best at fullstack!',
    friends: ['e2'],
    posts: ['p1', 'p2', 'p3'],
  },
  {
    id: 'e2',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    avatar: 'https://i.pravatar.cc/150?u=6',
    occupation: 'Devops Engineer',
    location: 'London, UK',
    status: 'Here to be the best at devops!',
    friends: ['e1'],
    posts: ['p4', 'p5', 'p6'],
  }
]

export const getPostAuthor = (authorId) => {
  const user = USERS.find(user => user.id === authorId);
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
  return POSTS;
}

export const getLoggedInUser = () => {
  return USERS.find(user => user.id === LOGGED_IN_USER);
}

