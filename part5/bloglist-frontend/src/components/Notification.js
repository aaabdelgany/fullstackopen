import React from 'react'

const Notification = ({code,title,author}) => {
    if (code==='success'){
      return(
        <div className="notification is-primary">
          A new blog "{title}" by {author} has been added!
        </div>
      )
    }else if(code==='badLog'){
      return(
        <div className="notification is-danger">
          wrong username or password
        </div>
      )
    }else if(code==='newBlogError'){
      return(
        <div className="notification is-danger">
          There was an issue saving your blog. Please try again shortly!
        </div>
      )
    }
    return (<div></div>);
  }
  
export default Notification