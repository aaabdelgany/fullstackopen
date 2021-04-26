// eslint-disable-next-line new-cap
const blogsRouter=require('express').Router();
const Blog=require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  Blog
      .find({})
      .then(async (blogs) => {
        await response.json(blogs);
      });
});
blogsRouter.get('/:id', async (req, res) => {
  const obj = await Blog.findById(req.params.id);
  res.send(obj);
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  blog
      .save()
      .then(async (result) => {
        await response.status(201).json(result);
      })
      .catch((error)=>next(error));
});

module.exports=blogsRouter;
