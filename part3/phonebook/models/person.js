/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
// const pw=process.argv[2];
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

// const uri = `mongodb+srv://abduser:${pw}@cluster0.q5nyb.mongodb.net/phonebook?retryWrites=true&w=majority`;

console.log('connecting to', url);
mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => {
    console.log('Connected to MongoDb!');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: Number,
    min: 10000000,
  },
});
personSchema.plugin(uniqueValidator);
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
// const Person=mongoose.model('Person',personSchema);

module.exports = mongoose.model('Person', personSchema);

// if(process.argv[3]){
//     const person=new Person({
//         name:process.argv[3],
//         number:process.argv[4]
//     })
//     console.log('yep');
//     person.save().then(res=>{
//         console.log(`Added ${process.argv[3]} number ${process.argv[4]} to the phonebook!`);
//         mongoose.connection.close();
//     })

// }else{
// Person.find({}).then(res=>{
//     console.log('Phonebook:')
//     res.forEach(person=>{
//         console.log(`${person.name}  ${person.number}`);
//     })
//     mongoose.connection.close();
// })
// }
