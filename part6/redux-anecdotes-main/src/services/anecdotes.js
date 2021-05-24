import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

const newAnecdote = async(anecdote) => {
    const newObj = {content:anecdote,votes:0}
    const res = await axios.post(baseUrl,newObj)
    return res.data
}

const voteAnecdote = async(anecdote)=>{
    const voteObj = {content:anecdote.content, votes: anecdote.votes + 1}
    const res = await axios.put(`${baseUrl}/${anecdote.id}`,voteObj)
    return res.data
}
export default { getAll, newAnecdote, voteAnecdote}
  