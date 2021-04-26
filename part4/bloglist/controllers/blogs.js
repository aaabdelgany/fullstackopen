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

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  blog
      .save()
      .then(async (result) => {
        await response.status(201).json(result);
      });
});

module.exports=blogsRouter;
