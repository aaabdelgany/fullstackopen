import React from 'react'
import { useDispatch } from 'react-redux'
import {addNew} from '../reducers/anecdoteReducer'
import {newNoti,clearNoti} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch();
    const add = (e) =>{
        e.preventDefault();
        const anecdote = e.target.anecdote.value;
        e.target.anecdote.value='';
        dispatch(addNew(anecdote))
        dispatch(newNoti(anecdote))
        setTimeout(()=>dispatch(clearNoti()),5000)
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