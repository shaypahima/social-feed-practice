import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config'


import feedRoutes from './routes/feedRoutes.js';
import authRoutes from './routes/authRoutes.js';

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


app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});