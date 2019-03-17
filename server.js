import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const userController = require('./src/api/users/userController');
const profiles = require('./src/api/profiles');
const posts = require('./src/api/posts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
import { mongoURI as db } from './config/keys';

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

// Use routes
app.use('/api/users', userController);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
