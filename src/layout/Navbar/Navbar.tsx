import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
// import PropTypes from 'prop-types';
// @material-ui/core components
import { createBrowserHistory } from 'history'
import withStyles from '@material-ui/core/styles/withStyles'
import jwt_decode from 'jwt-decode'
import { AppBar, Tabs, Tab, Grid } from '@material-ui/core'
// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard'
import ReceiptIcon from '@material-ui/icons/Receipt'
import PersonIcon from '@material-ui/icons/Person'
import ListIcon from '@material-ui/icons/List'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ChatIcon from '@material-ui/icons/Chat'
import SettingsIcon from '@material-ui/icons/Settings'
import { AuthMenu } from 'assets/jss/material-dashboard-react/components/headerStyle'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
// core components
// import AdminNavbarLinks from './AdminNavbarLinks'

import headerStyle from '../../assets/jss/material-dashboard-react/components/headerStyle'
import { useAppDispatch } from '../../store/hooks'
import { ToEmailSimplify } from 'utils/stringUtils'

import { selectTabAction } from '../../store/tab'

export const browserHistory = createBrowserHistory()

interface MyToken {
  email: string
}

function Navbar({ ...props }: any) {
  const { classes, color } = props
  const appBarClasses = classNames({
    [' ' + classes[color]]: color,
  })

  const [tabValue, setTabValue] = useState(0)
  const [token, setToken] = useState('')
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
    dispatch(selectTabAction(newValue))
  }

  const logOut = () => {
    localStorage.removeItem('jwtToken')
    browserHistory.push(`/`)
    window.location.reload()
  }

  useEffect(() => {
    if (localStorage.jwtToken) {
      let decoded = jwt_decode<MyToken>(localStorage.jwtToken)
      setToken(decoded.email)
    }
  }, [])

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="secondary"
            textColor="inherit"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Dashboard" icon={<DashboardIcon />} />
            <Tab label="User" icon={<PersonIcon />} />
            <Tab label="Trade" icon={<EqualizerIcon />} />
            <Tab label="Finance" icon={<ListIcon />} />
            <Tab label="LOG" icon={<ReceiptIcon />} />
            <Tab label="Chat" icon={<ChatIcon />} />
            <Tab label="Notification" icon={<NotificationsActiveIcon />} />
            <Tab label="Setting" icon={<SettingsIcon />} />
          </Tabs>
        </Grid>
        <AuthMenu
          title={
            <div>
              <div className={classes.email}>{ToEmailSimplify(token)}</div>

              <div className={classes.splitbar} />

              <div className={classes.logoutover} onClick={() => logOut()}>
                <div className={classes.wallet}>
                  <div>
                    <img src="/assets/logout.svg" alt="icon" />
                  </div>

                  <div
                    style={{
                      marginLeft: '12px',
                      alignSelf: 'center',
                      fontSize: '14px',
                    }}
                  >
                    Log Out
                  </div>
                </div>
              </div>
            </div>
          }
          interactive
          placement="bottom-end"
        >
          <span style={{ marginTop: '30px', marginRight: 'auto', marginLeft: 'auto' }}>
            <img src="/assets/admin.svg" alt="icon" width={30} className={classes.accountIcon} />
          </span>
        </AuthMenu>
      </Grid>
    </AppBar>
  )
}

export default withStyles(headerStyle)(Navbar)
