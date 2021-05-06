import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login';

const LoginForm =(props) => {
  return (
    <div>
    <Notification code={props.code}/>
    <form onSubmit={props.userLogin}>
      <div>
        username <input type="text" value={props.username} name = "username" onChange={({target})=>props.setUsername(target.value)}/>
      </div>
      <div>
        password <input type="text" value={props.password} name = "password" onChange={({target})=>props.setPassword(target.value)} />
      </div>
      <button type="submit"> login</button>
    </form>
  </div>
  )
}

const BlogForm = (props) => {
  return (
    <div class="content is-large">
      <h1>Create New Blog</h1>
      <form onSubmit={props.newFunc}>
        <div>title: <input type="text" name="text" value={props.title} onChange={({target})=>props.titleFunc(target.value)}></input></div>
        <div>author: <input type="text" name="text" value={props.author} onChange={({target})=>props.authorFunc(target.value)}></input></div>
        <div>url: <input type="text" name="text" value={props.url} onChange={({target})=>props.urlFunc(target.value)}></input></div>
        <button class="button is-primary" type="submit">create</button>
      </form>
    </div>
  )
}

const Notification = (props) => {
  if (props.code==='success'){
    return(
      <div class="notification is-primary">
        A new blog "{props.title}" by {props.author} has been added!
      </div>
    )
  }else if(props.code==='badLog'){
    return(
      <div class="notification is-danger">
        wrong username or password
      </div>
    )
  }
  return (<div></div>);
}
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(null);
  const [blogTitle,setTitle] = useState('');
  const [blogAuthor, setAuthor] = useState('');
  const [blogUrl,setUrl] = useState('');
  const [code,setCode] = useState('');

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

  const newBlog = async(e) => {
    e.preventDefault();
    const blog = {
      title:blogTitle,
      author: blogAuthor,
      url:blogUrl,
    };
    const config = {headers: {Authorization: `bearer ${user.token}`}};
    await blogService.newBlog(blog,config);
    const all = await blogService.getAll();
    setBlogs(all);
    setCode('success');
    setTimeout(function(){ 
      setCode('');
      setTitle('');
      setAuthor('');
      setUrl('');
     }, 5000);
  }


  const userLogin = async (e) => {
    e.preventDefault();
    try{
      const creds = {username,password};
      const user = await loginService.login(creds);
      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('loggedIn',JSON.stringify(user));
    }catch(error) {
      console.log(error);
      setCode('badLog');
      setTimeout(function(){ 
        setCode('');
       }, 5000);
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
        <loginForm code={code} username={username} setUsername={setUsername} password={password} 
        setPassword={setPassword} userLogin={userLogin}/>
      </div>
    )}
  return (
    <div class="content is-small">
      <h2>blogs</h2>
      <h3>{user.name} logged in</h3> <form onSubmit={userLogout}><button class="button is-info"type="submit"> logout </button></form>
      <Notification code={code} title={blogTitle} author={blogAuthor}/>
      <BlogForm title={blogTitle} author={blogAuthor} url={blogUrl} 
      titleFunc={setTitle} authorFunc={setAuthor} urlFunc={setUrl} newFunc={newBlog}/>
      <div class="content is-large"><h1>Blogs</h1></div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
};

export default App