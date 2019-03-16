import express from 'express';
import mongoose from 'mongoose';

const app = express();

// DB Config
import { mongoURI as db } from './config/keys';

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));