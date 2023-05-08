const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const posts = require('./routes/posts');
const auth = require('./routes/auth');

const { notFound, errorHandler, verifyUser } = require('./middlewares');

const app = express();

require('dotenv').config();

app.use(helmet());
app.use(bodyParser.json());

app.use('/api/user/', auth);
app.use('/api/post/', (req,res,next)=>{
    verifyUser(req, res, next)
}, posts);

app.get('/', (req, res) => {
    res.send('Hello, World!'); 
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;