import React from 'react'
import Notification from './Notification'

const LoginForm =(props) => {
  return (
    <div>
      <Notification code={props.code}/>
      <form onSubmit={props.userLogin}>
        <div>
          username <input id="username" type="text" value={props.username} name = "username" onChange={({ target }) => props.setUsername(target.value)}/>
        </div>
        <div>
          password <input id="pw" type="text" value={props.password} name = "password" onChange={({ target }) => props.setPassword(target.value)} />
        </div>
        <button id="loginButton" type="submit"> login</button>
      </form>
    </div>
  )
}
export default LoginForm