import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog,likeFunc,delFunc,user }) => {
  const [visible,setVisible] = useState(false)

  const delConf = (blog) => {
    const res = window.confirm(`Do you want to delete ${blog.title} ?`)
    if(res){
      delFunc(blog.id)
    }
  }
  if(visible && user.username===blog.user.username){
    return(
      <div className="box blog">
        {blog.title} by {blog.author} <button className="button is-info hide" onClick={() => setVisible(false)}>Hide</button> <br/>
        {blog.url}<br/>
        likes {blog.likes} <br/><button className="button is-link like" onClick={() => {likeFunc(blog)}}>Like</button><br/>
        <b>Name: </b>{blog.user.name}<br/>
        <button className="button is-warning del" onClick={() => delConf(blog)}>Delete Blog</button>
      </div>
    )
  }else if(visible){
    return(
      <div className="box blog">
        {blog.title} by {blog.author} <button className="button is-info hide" onClick={() => setVisible(false)}>Hide</button> <br/>
        {blog.url}<br/>
        likes {blog.likes} <br/><button className="button is-link like" onClick={() => {likeFunc(blog)}}>Like</button><br/>
        <b>Name: </b>{blog.user.name}
      </div>
    )
  }
  return(
    <div className="box blog">
      {blog.title} by {blog.author} <button className="button is-info view" onClick={() => setVisible(true)} >View</button>
    </div>
  )
}

Blog.propTypes = {
  blog:PropTypes.object.isRequired,
  likeFunc: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog