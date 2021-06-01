import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
// import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  // const [code,setCode] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort((a,b) => a.likes<b.likes?1 : -1) )
    }
    )
  }, [])

  useEffect(() => {
    const loggedIn = window.localStorage.getItem('loggedIn')
    if(loggedIn) {
      const user = JSON.parse(loggedIn)
      setUser(user)
    }
  }, [])

  const newBlog = async(blog) => {
    // const config = { headers: { Authorization: `bearer ${user.token}` } }
    try{
      await blogService.newBlog(blog)
      const all = await blogService.getAll()
      setBlogs(all.sort((a,b) => a.likes<b.likes?1 : -1))
      dispatch(setNotification('success',5))
      // setCode('success')
      // setTimeout(function(){
      //   setCode('')
      // }, 5000)
      return true
    } catch(error) {
      dispatch(setNotification('newBlogError',5))
      // setCode('newBlogError')
      // setTimeout(function(){
      //   setCode('')
      // }, 5000)
    }

  }

  const likeBlog = async(blog) => {
    // const config = { headers: { Authorization: `bearer ${user.token}` } }
    blog.likes+=1
    try{
      await blogService.likeBlog(blog)
      const all = await blogService.getAll()
      setBlogs(all.sort((a,b) => a.likes<b.likes?1 : -1))
    }catch(error) {
      console.log('error')
    }
  }
  const delBlog = async(blogId) => {
    // const config = { headers: { Authorization: `bearer ${user.token}` } }
    try{
      await blogService.delBlog(blogId)
      const all = await blogService.getAll()
      setBlogs(all.sort((a,b) => a.likes<b.likes?1 : -1))
    }catch(error) {
      console.log('error')
    }
  }

  const userLogin = async (e) => {
    e.preventDefault()
    try{
      const creds = { username,password }
      const user = await loginService.login(creds)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedIn',JSON.stringify(user))
      blogService.setConfig(user.token)
    }catch(error) {
      console.log(error)
      dispatch(setNotification('badLog',5))
      // setCode('badLog')
      // setTimeout(function(){
      //   setCode('')
      // }, 5000)
    }
  }

  const userLogout = async (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedIn')
    setUser(null)
  }

  if(user===null){
    return (
      <div>
        {/* <LoginForm code={code} username={username} setUsername={setUsername} password={password} */}

        <LoginForm username={username} setUsername={setUsername} password={password}
          setPassword={setPassword} userLogin={userLogin}/>
      </div>
    )}
  return (
    <div className="content is-small">
      <h2>blogs</h2>
      <h3>{user.name} logged in</h3> <form onSubmit={userLogout}><button className="button is-info"type="submit"> logout </button></form>
      {/* <BlogForm newFunc={newBlog} code={code}/> */}
      <BlogForm newFunc={newBlog} />

      <div className="content is-large"><h1>Blogs</h1></div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeFunc={likeBlog} delFunc={delBlog} user={user}/>
      )}
    </div>
  )
}

export default App