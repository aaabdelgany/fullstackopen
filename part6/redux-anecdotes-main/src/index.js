import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
// import anecdoteReducer from './reducers/anecdoteReducer'
// import { composeWithDevTools } from 'redux-devtools-extension'
import store from './store'

// const store = createStore(anecdoteReducer,composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)