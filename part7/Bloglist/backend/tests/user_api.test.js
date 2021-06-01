const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const helper = require('./test_helper');
const users = helper.initUsers;
const listHelper = require('../utils/list_helper');
beforeAll(async () => {
  await User.deleteMany({});
  for (const user of users) {
    await api
        .post('/api/users/')
        .send(user);
  }
});
describe('Users Tests', ()=>{
  test('get initial users', async () => {
    const initUsers = await api
        .get('/api/users/')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    expect(initUsers.body.length).toBe(2);
  });

  test('user creation', async () => {
    const newUser = {
      username: 'melody',
      password: 'kittycat',
      name: 'themelmain',
      blogs: [],
    };
    await api
    .post('/api/users/')
    .send(newUser)
    .expect(200)
    .expect('Content-Type',/application\/json/);

    const allUsers = await helper.allUsers();
    expect(allUsers.length).toBe(3);
  });

  test('username length validator', async () => {
    const newUser = {
      username: 'ha',
      password: 'ismail',
      name: 'nah dawg'
    };
    await api
    .post('/api/users/')
    .send(newUser)
    .expect(400);
    const allUsers = await helper.allUsers();
    expect(allUsers.length).toBe(3);
  })

  test('missing username!', async () => {
    const newUser = {
      password: 'ismail',
      name: 'nah dawg'
    };
    await api
    .post('/api/users/')
    .send(newUser)
    .expect(400);
    const allUsers = await helper.allUsers();
    expect(allUsers.length).toBe(3);
  });

  test('missing password', async () => {
    const newUser = {
      username: 'hamzooz',
      name: 'nah dawg'
    };
    await api
    .post('/api/users/')
    .send(newUser)
    .expect(401);

    const allUsers = await helper.allUsers();
    expect(allUsers.length).toBe(3);
  })

  test('invalid password', async () => {
    const newUser = {
      username: 'hamzooz',
      password: 'no',
      name: 'nah dawg'
    };
    await api
    .post('/api/users/')
    .send(newUser)
    .expect(401);

    const allUsers = await helper.allUsers();
    expect(allUsers.length).toBe(3);
  })

});


afterAll(() => {
  mongoose.connection.close();
});
