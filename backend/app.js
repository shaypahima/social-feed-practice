import express from 'express';
import bodyParser from 'body-parser';

const USER = {
  id: 'e1',
  name: 'Shay Pahima',
  email: 'shphm4668@gmail.com',
  status: 'Here to be the best at fullstack!'
}



const posts = [
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

const app = express();

app.set(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});

app.get('/user', (req, res, next) => {
  res.status(200).json({ user: USER });
})

app.get('/posts', (req, res, next) => {
  res.status(200).json({ posts });
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});