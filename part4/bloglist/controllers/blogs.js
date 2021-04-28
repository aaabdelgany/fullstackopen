// eslint-disable-next-line new-cap
const blogsRouter=require('express').Router();
const Blog=require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// const getToken = (req) => {
//   const authorization = req.get('authorization');
//   if(authorization && authorization.toLowerCase().startsWith('bearer')){
//     return authorization.substring(7);
//   }
//   return null;
// };
blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name: 1, id: 1})
      .catch((error)=>next(error));
  response.json(blogs);
});
blogsRouter.get('/:id', async (req, res, next) => {
  const obj = await (await Blog.findById(req.params.id)).populate('user', {username: 1, name: 1, id: 1})
      .catch((error)=>next(error));
  res.send(obj);
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);
  const token = request.token;
  console.log(token);
  const decodedToken = jwt.verify(token,process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  // const users = await User.find({});
  // const user = users[Math.floor(Math.random() * users.length)];
  blog.user = user.id;
  await blog.save()
      .catch((error)=>next(error));
  user.blogs = user.blogs.concat(blog.id);
  await user.save();
  response.status(201).json(blog);
});

blogsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  await Blog.findByIdAndRemove(id)
      .catch((error) => next(error));
  res.status(204).end();
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
