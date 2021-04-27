// eslint-disable-next-line new-cap
const blogsRouter=require('express').Router();
const Blog=require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
      .catch((error)=>next(error));
  response.json(blogs);
});
blogsRouter.get('/:id', async (req, res, next) => {
  const obj = await Blog.findById(req.params.id)
      .catch((error)=>next(error));
  res.send(obj);
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  await blog.save()
      .catch((error)=>next(error));
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
  const upBlog = await Blog.findByIdAndUpdate(id, body, {new: true})
      .catch((error) => next(error));
  res.json(upBlog);
});
module.exports=blogsRouter;
