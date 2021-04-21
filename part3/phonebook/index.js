// const { response } = require('express');
require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());

const cors = require('cors');

app.use(cors());

app.use(express.static('build'));

const morgan = require('morgan');

const Person = require('./models/person');

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// let persons=[
//     {
//       name: "Dan Abramov",
//       number: "12-43-234345",
//       id: 3
//     },
//     {
//       name: "Mary Poppendieck",
//       number: "39-23-6423122",
//       id: 4
//     },
//     {
//       name: "arto hellas",
//       number: "z",
//       id: 5
//     }
//   ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
// res.json(persons)
});

app.get('/api/persons/:id', (req, res) => {
// const id=Number(req.params.id);
// const person=persons.find(person=>person.id===id);
// res.json(person);
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.delete('/api/persons/:id', (req, res, next) => {
// const id=Number(req.params.id);
// console.log(id);
  Person.findByIdAndDelete(req.params.id)
    .then(
      res.status(204).end(),
    )
    .catch((error) => next(error));
// persons=persons.filter(person=>person.id!==id)
// res.status(204).end();
});
app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;

  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then((uPerson) => {
      res.json(uPerson);
    })
    .catch((error) => next(error));
});
app.post('/api/persons', (req, res, next) => {
  const { body } = req;
  // if(!body.name || !body.number){
  //     return res.status(400).json({
  //         error: 'content missing'
  //       })
  // }
  // if(persons.filter(peep=>peep.name===person.name).length!==0){
  //     return res.status(400).json({
  //         error: 'name must be unique'
  //       })
  // }
  // const newId=Math.floor(Math.random()*10000);
  // const maxId=persons.length>0?Math.max(...persons.map(p=>p.id)):0
  // person.id=maxId+1;

  // person.id=newId;
  // persons=persons.concat(person);
  // res.json(person);
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => {
    res.json(savedPerson);
  })
    .catch((error) => next(error));
});
app.get('/info', (req, res) => {
  Person.find({}).then((people) => {
    const message = `<p>Phonebook has info for ${people.length} people</p><p>${Date()}</p>`;
    res.send(message);
  });
// const message=`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
  return false;
};

// this has to be the last loaded middleware.
app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
