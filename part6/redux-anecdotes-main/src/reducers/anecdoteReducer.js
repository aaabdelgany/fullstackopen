const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
export const voteAnec = (id) => {
  return {
    type:'VOTE',
    data:{id}
  }
}

export const addNew = (anecdote) => {
  return {
    type:'ADD',
    data:{anecdote}
  }
}
const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'VOTE':
      const id = action.data.id;
      const voteAnecdote = state.find(n=>n.id===id)
      const newAnecdote = {
        ...voteAnecdote,votes:voteAnecdote.votes +1
      }
      return state.map(an=>an.id!=id?an : newAnecdote)
    case 'ADD':
      const addAnecdote = action.data.anecdote;
      return state.concat(asObject(addAnecdote));
    default: return state
  }

}

export default reducer