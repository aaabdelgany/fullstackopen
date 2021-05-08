import React, { useState } from 'react'
const Blog = ({blog,likeFunc,delFunc,user}) =>{
  const [visible,setVisible] = useState(false);

  const delConf = (blog) => {
    const res = window.confirm(`Do you want to delete ${blog.title} ?`)
    if(res){
      delFunc(blog.id);
    }
  }
if(visible && user.username===blog.user.username){
  return(
    <div>
      {blog.title} by {blog.author} <button className="button is-info" onClick={()=>setVisible(false)}>Hide</button> <br/>
      {blog.url}<br/>
      likes {blog.likes} <button className="button is-link" onClick={()=>{likeFunc(blog)}}>Like</button><br/>
      {blog.user.name}
      <button className="button is-warning" onClick={()=>delConf(blog)}>Delete Blog</button>
    </div>  
  )
}else if(visible){
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