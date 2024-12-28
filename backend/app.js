import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import feedRoutes from './routes/feedRoutes.js';
import authRoutes from './routes/authRoutes.js';
import 'dotenv/config'


const app = express();

app.use(bodyParser.json());

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


const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

startServer();
