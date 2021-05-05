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

  useEffect(() => {
    const loggedIn = window.localStorage.getItem('loggedIn');
    if(loggedIn) {
      const user = JSON.parse(loggedIn);
      setUser(user);
    }
  }, []);

  const userLogin = async (e) => {
    e.preventDefault();
    console.log(`logging in with ${username} and ${password}`);

    try{
      const creds = {username,password};
      const user = await loginService.login(creds);
      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('loggedIn',JSON.stringify(user));
    }catch(error) {
      console.log(error);
    }
  };

  const userLogout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem('loggedIn');
    setUser(null);
  }

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
      <h3>{user.name} logged in</h3> <form onSubmit={userLogout}><button type="submit"> logout </button></form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
};

export default App