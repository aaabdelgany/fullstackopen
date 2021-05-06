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

export default { getAll,newBlog }