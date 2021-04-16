const mongoose = require('mongoose')
const pw=process.argv[2];
const uri = `mongodb+srv://abduser:${pw}@cluster0.q5nyb.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema=new mongoose.Schema({
    name:String,
    number:Number
})
const Person=mongoose.model('Person',personSchema);


if(process.argv[3]){
    const person=new Person({
        name:process.argv[3],
        number:process.argv[4]
    })
    console.log('yep');
    person.save().then(res=>{
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to the phonebook!`);
        mongoose.connection.close();
    })

}else{
Person.find({}).then(res=>{
    console.log('Phonebook:')
    res.forEach(person=>{
        console.log(`${person.name}  ${person.number}`);
    })
    mongoose.connection.close();
})
}
