import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './bulma.min.css'
import { createStore, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'



const store = createStore(
  notificationReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))