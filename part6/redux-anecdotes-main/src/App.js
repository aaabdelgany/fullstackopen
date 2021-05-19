import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteAnec, addNew} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
const App = () => {
  const anecdotes = useSelector(state => state.sort((a,b)=>a.votes<b.votes?1 : -1))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnec(id))
  }

  return (
    <div>
    <h2>Anecdotes</h2>
    <AnecdoteList />
    <AnecdoteForm />
    </div>
  )
}

export default App