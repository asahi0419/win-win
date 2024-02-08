import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { wsClient } from './config/config'
// import LandingPage from './layout/LandingPage';
import Layout from './layout'
import Login from 'pages/Auth/Login'
import Register from 'pages/Auth/Register'
import useHandleMessage from './hooks/useHandleMessage'
import { Code } from './constants'
import Alert from './components/Alert'

const App: React.FC = () => {
  var adminVerify = {
    code: Code.CODE_ADMIN_CLIENT,
    data: {
      message: 'Admin',
    },
  }

  React.useEffect(() => {
    wsClient.onopen = handleOpen
    wsClient.onerror = handleError
    wsClient.onmessage = getMessage
    wsClient.onclose = handleClose
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpen = () => {
    console.log('ws connection opened')
    wsClient.send(JSON.stringify(adminVerify))
    localStorage.setItem('webSocketDisConnectState', 'connect')
  }

  const handleError = (error: any) => {
    console.error('ws error', error)
    handleClose()
  }

  const handleClose = () => {
    console.error('ws connection closed')
    localStorage.setItem('webSocketDisConnectState', 'disconnect')
  }

  const { onParseMessage } = useHandleMessage()

  const getMessage = (event: any) => {
    const message = JSON.parse(event.data)

    onParseMessage(message)
  }
  return (
    <Router>
      {!localStorage.jwtToken ? (
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/" component={Login} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      )}
      <Alert />
    </Router>
  )
}

export default App
