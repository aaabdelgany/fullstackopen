import blogService from '../services/blogs'

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type:'INIT',
      data:blogs
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likeBlog = await blogService.likeBlog(blog)
    dispatch({
      type:'LIKE',
      data:likeBlog
    })
  }
}

export const addNew = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.newBlog(blog)
    dispatch({
      type:'ADD',
      data:newBlog
    })
  }
}

export const delBlog = (blog) => {
  return async dispatch => {
    const deletedBlog = await blogService.delBlog(blog)
    dispatch({
      type:'DEL',
      data:deletedBlog
    })
  }
}

const reducer = (blogs=[],action) => {
  switch(action.type){
  case 'INIT':
    return action.data
  case 'LIKE':
    const id = action.data.id
    const likeAnecdote = state.find(n => n.id===id)
    const newAnecdote = {
      ...likeAnecdote,likes:likeAnecdote.likes +1
    }
    return state.map(an => an.id!=id?an : newAnecdote)
  case 'ADD':
    return state.concat(action.data)
  case 'DEL':
    const delId = action.data.id
    return state.map(blog => blog.id!=delId)
  default: return state
  }
}

export default reducer