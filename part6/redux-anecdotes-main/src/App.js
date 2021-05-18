import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a,b)=>a.votes<b.votes?1 : -1))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch({type:'VOTE',data:{id}})
  }
  const add = (e) =>{
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value='';
    dispatch({type:'ADD',data:{anecdote}})
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App