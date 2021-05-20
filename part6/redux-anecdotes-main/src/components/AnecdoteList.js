import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {voteAnec} from '../reducers/anecdoteReducer'
import {newNoti,clearNoti} from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state =>{
      const anecState=state.anecdotes.sort((a,b)=>a.votes<b.votes?1 : -1)
      if(state.filter===''){
        return anecState
      }
      return anecState.filter(anecdote=>anecdote.content.includes(state.filter))
    } )
    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(voteAnec(anecdote.id))
        dispatch(newNoti(anecdote.content))
        setTimeout(dispatch(clearNoti()),5000)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList