import React from 'react'
import ReactDOM from 'react-dom'
import jwt_decode from 'jwt-decode'

import './index.css'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

interface MyToken {
  expiredAt: number
}

if (localStorage.jwtToken) {
  let decoded = jwt_decode<MyToken>(localStorage.jwtToken)
  const currentTime = Date.now() / 1000
  if (decoded.expiredAt < currentTime) {
    localStorage.removeItem('jwtToken')
    window.location.href = '/login'
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
