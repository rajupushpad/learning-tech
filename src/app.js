const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
app.use(cors())
require('dotenv').config();

const posts = require('./routes/posts');
const auth = require('./routes/auth');
const category = require('./routes/category');
const course = require('./routes/course');
const topic = require('./routes/topic');
const content = require('./routes/content');
const user = require('./routes/user');


const { notFound, errorHandler, verifyUser } = require('./middlewares');

app.use(helmet());
app.use(bodyParser.json());

app.use('/api/user/', auth);

app.use('/api/post/', (req,res,next)=>{
    verifyUser(req, res, next)
}, posts);

app.use('/api/category/', (req,res,next)=>{
    verifyUser(req, res, next)
}, category);

app.use('/api/course/', (req,res,next)=>{
    verifyUser(req, res, next)
}, course);

app.use('/api/topic/', (req,res,next)=>{
    verifyUser(req, res, next)
}, topic);

app.use('/api/content/', (req,res,next)=>{
    verifyUser(req, res, next)
}, content);

app.use('/api/user/', (req,res,next)=>{
    verifyUser(req, res, next)
}, user);

app.get('/', (req, res) => {
    res.send('Hello, World!'); 
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;