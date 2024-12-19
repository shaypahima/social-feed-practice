import express from 'express';
import bodyParser from 'body-parser';

const USER = {
  id: 'e1',
  name: 'Shay Pahima',
  email: 'shphm4668@gmail.com',
  status: 'Here to be the best at fullstack!'
}

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});