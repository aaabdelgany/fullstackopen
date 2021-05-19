import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {voteAnec} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.sort((a,b)=>a.votes<b.votes?1 : -1))
    const dispatch = useDispatch();

    const vote = (id) => {
        dispatch(voteAnec(id))
      }

    return (
        <div>
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
        </div>
    )
}

export default AnecdoteList