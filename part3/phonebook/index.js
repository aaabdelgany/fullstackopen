const { response } = require('express');
require('dotenv').config()

const express=require('express');
const app=express();
app.use(express.json());
const cors=require('cors');
app.use(cors());

app.use(express.static('build'))

const morgan=require('morgan');
const Person=require('./models/person')
morgan.token('body',(req)=>{
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons=[
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    },
    {
      name: "arto hellas",
      number: "z",
      id: 5
    }
  ]


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (req, res) => {
    Person.find({}).then(people=>{
        res.json(people);
    })
    // res.json(persons)
  })

app.get('/api/persons/:id',(req,res)=>{
    // const id=Number(req.params.id);
    // const person=persons.find(person=>person.id===id);
    // res.json(person);
    Person.findById(req.params.id).then(person=>{
        res.json(person);
    })
})

app.delete('/api/persons/:id',(req,res)=>{
    const id=Number(req.params.id);
    persons=persons.filter(person=>person.id!==id)
    res.status(204).end();
})

app.post('/api/persons',(req,res)=>{
    const body=req.body;
    if(!body.name || !body.number){
        return res.status(400).json({ 
            error: 'content missing' 
          })         
    }
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
    const person=new Person({
        name:body.name,
        number:body.number
    })
    person.save().then(savedPerson=>{
        res.json(savedPerson);
    })
})
app.get('/info',(req,res)=>{
    Person.find({}).then(people=>{
        const message=`<p>Phonebook has info for ${people.length} people</p><p>${Date()}</p>`
        res.send(message)

    })
    // const message=`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})