const bcrypt = require('bcrypt');
// eslint-disable-next-line new-cap
const usersRouter = require('express').Router();
const User = require('../models/user');


usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('blogs',{user: 0, likes: 0})
      .catch((error)=>next(error));
  res.json(users);
});

usersRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id).populate('blogs',{user: 0, likes: 0})
      .catch((error)=>next(error));
  res.json(user);
});

usersRouter.post('/', async (req, res, next) => {
  const body = req.body;
  const pw = body.password;

  if (!pw || pw.length<3) {
    return res.status(401).json({error: 'invalid username or password!'});
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
