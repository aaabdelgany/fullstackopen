import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const res  = await axios.get(baseUrl);
  return res.data;
}

const newBlog = async (blog, config) => {
  // const config = {
  //   Authorization: token
  // };
  const res = await axios.post(baseUrl,blog, config);
  return res.data;
}

const likeBlog = async (blog, config) => {
  console.log(blog.id);
  blog.user = blog.user.id;
  const res = await axios.put(`${baseUrl}/${blog.id}`,blog, config);
  console.log(res.data);
  return res.data;
}

export default { getAll,newBlog,likeBlog }