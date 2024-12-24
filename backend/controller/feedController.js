
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
    userId: 'e1',
    date: '2024-01-04'
  },
  {
    id: 'p5',
    title: 'hi family',
    content: 'lorem ipsum dolo amet consectetur adipisicing elit. Quisquam, quos.',
    userId: 'e1',
    date: '2024-01-05'
  },
  {
    id: 'p6',
    title: 'hi brother',
    content: 'lorem ipsum dolo amet consectetur adipisicing elit. Quisquam, quos.',
    userId: 'e1',
    date: '2024-01-06'
  }

]

export const getFeed = (req, res, next) => {
  res.status(200).json({ posts: POSTS });
}


