import React, { useEffect, useState } from 'react';
import pS from './services/persons';
const Phonebook=({phonebook,delFunc})=>{
  return(phonebook.map(person=><Person delFunc={delFunc} key={person.id} person={person}/>))
  }

const Person=({person,delFunc})=>{
  return(
  <>
  <p>{person.name} {person.number}</p>
  <button onClick={()=>{delFunc(person)}}>delete</button>
  </>);
}

const SearchFilter=({filter,func})=>{
  return (<div>filter shown with <input value={filter} onChange={func}/></div>)
}

const AddForm=({name,numb,nameFunc,numFunc,addName})=>{
  return (
    <>
    <h2>Add a new</h2>
    <form>
      <div>name: <input value={name} onChange={nameFunc}/></div>
      <div>number: <input value={numb} onChange={numFunc}/></div>
      <div><button onClick={addName} type="submit">add</button></div>
    </form>
    </>
  )
}

const Notification=({message})=>{
  if (message===''){
    return null;
  }else if(message==='success'){
  return(<div className='success'>The user was successfully added/updated dawg!</div>)
  }else if(message==='error'){
    return(<div className='error'>The user was already deleted dawg dawg!</div>)
  }
}
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('');
  const [newNum,setNewNum]=useState('');
  const [filt,setFilt]=useState('');
  const [message,setMessage]=useState('');

  useEffect(()=>{
    pS.getAll()
    .then(allPeeps=>{
      setPersons(allPeeps);
    })
  },[])

  
  const nameChange=(event)=>{
    setNewName(event.target.value);
  }
  const numChange=(event)=>{
    setNewNum(event.target.value);
  }
  const filtChange=(event)=>{
    setFilt(event.target.value);
  }

  const delFunc=async (peep)=>{
    await pS.delPer(peep)
    pS.getAll()
    .then(allPeeps=>{
      console.log(allPeeps);
      setPersons(allPeeps);
    })
  }
  const updateFunc=(peep)=>{
    const newPer={
      name:newName,
      id:peep,
      number:newNum
    }
    return pS.updatePer(peep,newPer);
  }

  const addName=async (event)=>{
    event.preventDefault();
    for(let person of persons){
      if(person.name===newName){
        try{
          await updateFunc(person.id)
          setMessage('success')
        }catch (error){
          setMessage('error');
      }
        setTimeout(()=>{setMessage('')},5000)
        setNewName('');
        setNewNum('');
        pS.getAll()
        .then(allPeeps=>{
        setPersons(allPeeps);
         })
        return;
      }
    }
    const person={
      name:newName,
      number:newNum
    }
    pS.create(person)
    .then(newPeep=>{
      setPersons(persons.concat(newPeep));
      setMessage(`success`)
      setTimeout(()=>{setMessage('')},5000)
      setNewName('');
      setNewNum('');
    })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <SearchFilter filter={filt} func={filtChange}/>
      <AddForm name={newName} numb={newNum} nameFunc={nameChange} numFunc={numChange} addName={addName}/>
      <h2>Numbers</h2>
      <Phonebook delFunc={delFunc} phonebook={persons.filter(person=>person.name.includes(filt))} />
    </div>
  )
}

export default App