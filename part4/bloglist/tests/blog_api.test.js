const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');
const blogs = helper.initBlogs;
const listHelper = require('../utils/list_helper');

beforeAll(async () => {
  await Blog.deleteMany({});
  for (const blog of blogs) {
    const newBlog = new Blog(blog);
    await newBlog.save();
  }
});

describe('Dummy', ()=>{
  test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});
describe('blogs testing', ()=>{
  test('all notes', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
  });

  test('id parameter', async () => {
    const res = await api
        .get('/api/blogs');
    expect(res.body[0].id).toBeDefined();
  });

  test('adding blog', async () => {
    const newBlog={
      title: 'testing',
      author: 'ya boy',
      likes: 1500,
      url: 'google.com',
    };
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    const res= await api.get('/api/blogs');
    expect(res.body).toHaveLength(blogs.length + 1);
  });

  test('default likes', async ()=>{
    const unPopular={
      title: 'im not popular',
      author: 'ya boy',
      url: 'nah.com',
    };
    const newBlog = await api
        .post('/api/blogs')
        .send(unPopular)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    expect(newBlog.body.likes).toBe(0);
  });

  test('missing title and author', async () => {
    const badBlog ={
      likes: 15,
      author: 'me!',
    };
    await api
        .post('/api/blogs')
        .send(badBlog)
        .expect(400);
  });

  test('deleting blog', async () => {
    let allBlogs = await helper.allBlogs();
    const allLen = allBlogs.length;
    const delBlog = allBlogs[0];
    await api
        .delete(`/api/blogs/${delBlog.id}`)
        .expect(204);
    allBlogs = await helper.allBlogs();
    expect(allBlogs.length).toBe(allLen-1);

    const contents = allBlogs.map((blog) => blog.title);
    expect(contents).not.toContain(delBlog.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
