const config=require('./utils/config');
const express=require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter=require('./controllers/blogs');
const middleware = require('./utils/middleware');
const logger=require('./utils/logger');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true, useUnifiedTopology: true,
  useFindAndModify: false, useCreateIndex: true,
})
    .then(()=>{
      logger.info('Connected to MongoDB!');
    })
    .catch((error)=>{
      logger.error(`error connecting to mongodb ${error.message}`);
    });

app.use(cors());
app.use(express.json());
app.use(middleware.reqLogger);
app.use(middleware.tokenHandler);
// app.use(middleware.userHandler);
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login',loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports=app;
