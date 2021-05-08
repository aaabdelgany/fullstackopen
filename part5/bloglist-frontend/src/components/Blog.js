import React, { useState } from 'react'
const Blog = ({blog,likeFunc}) =>{
  const [visible,setVisible] = useState(false);
if(visible){
  return(
    <div>
      {blog.title} by {blog.author} <button className="button is-info" onClick={()=>setVisible(false)}>Hide</button> <br/>
      {blog.url}<br/>
      likes {blog.likes} <button className="button is-link" onClick={()=>{likeFunc(blog)}}>Like</button><br/>
      {blog.user.name}
    </div>  
  )
}
  return(
    <div>
      {blog.title} by {blog.author} <button className="button is-info" onClick={()=>setVisible(true)} >View</button>
    </div>  
  )
} ;

export default Blog