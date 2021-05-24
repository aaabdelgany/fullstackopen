import anecdoteService from '../services/anecdotes'

export const voteAnec = (anecdote) => {
  return async dispatch => {
    const voteAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type:'VOTE',
      data:voteAnecdote
    })
  }
  // return {
  //   type:'VOTE',
  //   data:{id}
  // }
}

export const addNew = (anecdote) => {
  return async dispatch => {
    const newAnec = await anecdoteService.newAnecdote(anecdote)
    dispatch({
      type:'ADD',
      data:newAnec
    })
  }
  // return {
  //   type:'ADD',
  //   data:anecdote
  // }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
          type:'INIT',
          data:anecdotes
        })
  }
}

// export const initAnecdotes = async (anecdotes) => {
//   return {
//     type:'INIT',
//     data:anecdotes
//   }
// }
//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE':
      const id = action.data.id;
      const voteAnecdote = state.find(n=>n.id===id)
      const newAnecdote = {
        ...voteAnecdote,votes:voteAnecdote.votes +1
      }
      return state.map(an=>an.id!=id?an : newAnecdote)
    case 'ADD':
      return state.concat(action.data);
    case 'INIT':
      return action.data
    default: return state
  }

}

export default reducer