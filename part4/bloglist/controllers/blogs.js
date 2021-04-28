// eslint-disable-next-line new-cap
const blogsRouter=require('express').Router();
const Blog=require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');
// const getToken = (req) => {
//   const authorization = req.get('authorization');
//   if(authorization && authorization.toLowerCase().startsWith('bearer')){
//     return authorization.substring(7);
//   }
//   return null;
// };
blogsRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name: 1, id: 1})
      .catch((error)=>next(error));
  res.json(blogs);
});
blogsRouter.get('/:id', async (req, res, next) => {
  const obj = await (await Blog.findById(req.params.id)).populate('user', {username: 1, name: 1, id: 1})
      .catch((error)=>next(error));
  res.send(obj);
});

blogsRouter.post('/', middleware.userHandler, async (req, res, next) => {
  const blog = new Blog(req.body);
  // const token = req.token;
  // const decodedToken = jwt.verify(token,process.env.SECRET);
  // if (!token || !decodedToken.id) {
  //   return res.status(401).json({ error: 'token missing or invalid' });
  // }
  const user = await User.findById(req.user);
  // const users = await User.find({});
  // const user = users[Math.floor(Math.random() * users.length)];
  blog.user = user.id;
  await blog.save()
      .catch((error)=>next(error));
  user.blogs = user.blogs.concat(blog.id);
  await user.save();
  res.status(201).json(blog);
});

blogsRouter.delete('/:id', middleware.userHandler, async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  try{
    const blog = await Blog.findById(id);
    if (user === blog.user.toString()) {
      blog.delete();
      res.status(204).end();
    }
    res.status(401).send({error: 'invalid token or user'});
  } catch (error){
    next(error);
  }
  
});

blogsRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const upBlog = await Blog.findByIdAndUpdate(id, body, {new: true});
    res.json(upBlog);
  } catch (error) {
    next(error);
  }
});
module.exports=blogsRouter;
