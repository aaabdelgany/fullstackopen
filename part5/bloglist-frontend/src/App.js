import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const userLogin = async (e) => {
    e.preventDefault();
    console.log(`logging in with ${username} and ${password}`);

    try{
      const creds = {username,password};
      const user = await loginService.login(creds);
      setUser(user);
      setUsername('');
      setPassword('');
      console.log('massive success!');
      console.log(user);
    }catch(error) {
      console.log(error);
    }
  };
  if(user===null){
    return (
      <div>
        <form onSubmit={userLogin}>
          <div>
            username <input type="text" value={username} name = "username" onChange={({target})=>setUsername(target.value)}/>
          </div>
          <div>
            password <input type="text" value={password} name = "password" onChange={({target})=>setPassword(target.value)} />
          </div>
          <button type="submit"> login</button>
        </form>
      </div>
    )}
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
};

export default App