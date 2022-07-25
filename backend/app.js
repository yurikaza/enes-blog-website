const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require("helmet");
const xss = require("xss-clean");
const upload = require("express-fileupload");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(upload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comment', commentRouter);

dotenv.config();
const DB = process.env.DATABASE_LOCAL;

mongoose
    .connect(DB, {
       useNewUrlParser: true,
    })
.then(() => console.log("DB connection successful!"));


module.exports = app;
