const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');
const blogs = helper.initBlogs;
const users = helper.initUsers;
const listHelper = require('../utils/list_helper');
let token = '';

beforeAll(async () => {
  await Blog.deleteMany({});
  const user=users[0];
  await api
    .post('/api/users')
    .send(user);
  const {body} = await api
    .post('/api/login')
    .send(user);
    token = body.token;
  for (const blog of blogs) {
    await api
    .post('/api/blogs')
    .set({Authorization: `bearer ${token}`})
    .send(blog);
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
  test('all blogs', async () => {
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

  test('adding blog w/o token', async () => {
    const newBlog={
      title: 'testing',
      author: 'ya boy',
      likes: 1500,
      url: 'google.com',
    };
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401);
        // .expect('Content-Type', /application\/json/);
    const res= await api.get('/api/blogs');
    expect(res.body).toHaveLength(blogs.length);
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
        .set({Authorization: `bearer ${token}`})
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
        .set({Authorization: `bearer ${token}`})
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
        .set({Authorization: `bearer ${token}`})
        .send(badBlog)
        .expect(400);
  });

  test('deleting blog', async () => {
    let allBlogs = await helper.allBlogs();
    const allLen = allBlogs.length;
    const delBlog = allBlogs[0];
    await api
        .delete(`/api/blogs/${delBlog.id}`)
        .set({Authorization: `bearer ${token}`})
        .expect(204);
        allBlogs = await helper.allBlogs();
    // console.log(delBlog);
    // console.log(newAllBlogs);
    expect(allBlogs.length).toBe(allLen-1);
    const contents = allBlogs.map((blog) => blog.title);
    expect(contents).not.toContain(delBlog.title);
  });

  test('updating blog', async () => {
    let allBlogs = await helper.allBlogs();
    const id = allBlogs[0].id;
    const upBlog = {title: 'what it do!', url: 'ok den', author: 'hmm'};
    await api
        .put(`/api/blogs/${id}`)
        .send(upBlog)
        .expect(200);
    allBlogs = await helper.allBlogs();
    const myBlog = allBlogs.filter((blog) => blog.id===id);
    expect(myBlog[0].title).toBe('what it do!');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
