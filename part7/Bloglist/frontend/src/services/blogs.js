import axios from 'axios'
const baseUrl = '/api/blogs'
let config = null


const setConfig = (token) => {
  config = { headers: { Authorization: `bearer ${token}` } }
}
const getAll = async () => {
  const res  = await axios.get(baseUrl)
  return res.data
}

const newBlog = async (blog) => {
  const res = await axios.post(baseUrl,blog, config)
  return res.data
}

const likeBlog = async (blog) => {
  blog.user = blog.user.id
  const res = await axios.put(`${baseUrl}/${blog.id}`,blog, config)
  return res.data
}

const delBlog = async(blogId) => {
  const res = await axios.delete(`${baseUrl}/${blogId}`, config)
  return res.data
}

export default { getAll,newBlog,likeBlog,delBlog, setConfig }