import React from 'react'
import { useDispatch } from 'react-redux'
import {addNew} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch();
    const add = async (e) =>{
        e.preventDefault();
        const anecdote = e.target.anecdote.value;
        e.target.anecdote.value='';
        dispatch(addNew(anecdote))
        dispatch(setNotification(`You added '${anecdote}'!`,5))
      }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote"/></div>
                <button>create</button>
             </form>
        </div>
    )
}

export default AnecdoteForm