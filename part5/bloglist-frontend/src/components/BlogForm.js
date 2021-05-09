import React, { useState } from 'react'
import Notification from './Notification'

//<BlogForm title={blogTitle} author={blogAuthor} url={blogUrl}
//titleFunc={setTitle} authorFunc={setAuthor} urlFunc={setUrl} newFunc={newBlog}/>
const BlogForm = (props) => {
  const [visible, setVisible] = useState(false)
  const [blogTitle,setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [blogUrl,setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title:blogTitle,
      author: blogAuthor,
      url:blogUrl,
    }
    const success = await props.newFunc(newBlog)
    setVisible(false)
    if(success){
      setTimeout(() => {
        setTitle('')
        setAuthor('')
        setUrl('')
      }, 5000)
    }
  }
  if(visible){
    return (

      <div className="content is-large">
        <h1>Create New Blog</h1>
        <form onSubmit={addBlog}>
          <div>title: <input type="text" name="text" value={blogTitle} onChange={({ target }) => setTitle(target.value)}></input></div>
          <div>author: <input type="text" name="text" value={blogAuthor} onChange={({ target }) => setAuthor(target.value)}></input></div>
          <div>url: <input type="text" name="text" value={blogUrl} onChange={({ target }) => setUrl(target.value)}></input></div>
          <button className="button is-primary" type="submit">create</button>
        </form>

        <button className="button is-warning" type="submit" onClick={() => setVisible(false)}>Hide</button>

      </div>
    )
  }
  return (
    <div>
      <Notification code={props.code} title={blogTitle} author={blogAuthor}/>
      <h1>Create New Blog</h1>
      <button className="button is-primary" type="submit" onClick={() => setVisible(true)}>Create Blog</button>
    </div>
  )
}

export default BlogForm
