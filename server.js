import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const userController = require('@/api/users/userController');
const profileController = require('@/api/profiles/profileController');
const postController = require('@/api/posts/postController');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
import { mongoURI as db } from 'config/keys';

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

// Use routes
app.use('/api/users', userController);
app.use('/api/profiles', profileController);
app.use('/api/posts', postController);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
