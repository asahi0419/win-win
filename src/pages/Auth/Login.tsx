import React, { useState } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import CancelIcon from '@material-ui/icons/Cancel'
import ShowPassIcon from '@material-ui/icons/Visibility'
import HidePassIcon from '@material-ui/icons/VisibilityOff'

import { FormControl, FormHelperText, Snackbar, ClickAwayListener } from '@material-ui/core'

import { useAppSelector } from 'store/hooks'
import { useAppDispatch } from 'store/hooks'
import { loginUser } from 'store/auth'
import { loginAuth } from 'store/auth/selectors'

import { useStyles } from './Style'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function EmailForm() {
  const classes = useStyles()

  const loginInfo = useAppSelector(loginAuth)
  const [alert, setAlert] = React.useState('')

  React.useEffect(() => {
    if (loginInfo !== undefined) {
      if (loginInfo.Error !== undefined) {
        setAlert(loginInfo.Error.Msg)
        setOpenNotification(true)
      }
    }
  }, [loginInfo])

  //----------------------------notification-----------------------------------------

  const [openNotification, setOpenNotification] = React.useState(false)
  const handleCloseNotification = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenNotification(false)
  }

  //-------email and password validate-------------------------------
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailValid, setEmailValid] = useState('')
  const [passwordValid, setPasswordValid] = useState('')

  const handleEmailChange = (value: any) => {
    setEmail(value)
    let regEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regEmail.test(value)) {
      setEmailValid('Entered value does not match email format.')
    } else {
      setEmailValid('')
    }
  }

  const cancelEmail = () => {
    setEmail('')
  }

  const cancelPassword = () => {
    setPassword('')
  }

  const handlePasswordChange = (pass: any) => {
    setPassword(pass)
    if (password.length > 0) {
      setPasswordValid('')
    }
  }

  const [showPass, setShowPass] = useState(false)
  const showPassword = () => {
    setShowPass(!showPass)
  }

  const [clickPassword, setClickPassword] = useState(false)
  const [clickEmail, setClickEmail] = useState(false)

  const handleClickPassword = () => {
    setClickPassword(true)
  }
  const handleClickEmail = () => {
    setClickEmail(true)
  }
  const handleCloseEmail = () => {
    setClickEmail(false)
  }
  const handleClosePassword = () => {
    setClickPassword(false)
  }
  //-----------------------------------------------------------------------------

  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (email.length === 0 && password.length === 0) {
      setEmailValid('Please enter your email.')
      setPasswordValid('Please enter your password.')
    } else if (password.length === 0 && email.length === 0) {
      setPasswordValid('Please enter your password.')
      setEmailValid('Please enter your email.')
    } else if (password.length === 0) {
      setPasswordValid('Please enter your password.')
    } else if (email.length === 0) {
      setEmailValid('Please enter your email.')
    } else if (email.length === 0) {
      setEmailValid('Please enter your email.')
    } else if (password.length === 0) {
      setPasswordValid('Please enter your password.')
    } else {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      dispatch(loginUser(formData))
    }
  }

  return (
    <div>
      <div className={classes.authForm}>
        <img src="/logo.svg" alt="logo" width={200} />
        <form onSubmit={handleSubmit}>
          <div>
            <FormControl className={classes.formControlSide} variant="outlined">
              <FormHelperText className={clsx(classes.fontColor1, classes.helperText)}>Email</FormHelperText>
              <ClickAwayListener onClickAway={handleCloseEmail}>
                <div
                  className={clsx({
                    [classes.inputSide]: emailValid === '',
                    [classes.inputSide3]: emailValid === '' && clickEmail === true,
                    [classes.inputSide2]: emailValid !== '',
                  })}
                >
                  <input
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onClick={handleClickEmail}
                    className={classes.input}
                  />
                  {email.length > 0 && clickEmail === true ? (
                    <CancelIcon className={classes.icon} onClick={cancelEmail} />
                  ) : (
                    ''
                  )}
                </div>
              </ClickAwayListener>
              <FormHelperText className={classes.error}>{emailValid === '' ? '' : emailValid}</FormHelperText>
            </FormControl>
          </div>

          <div>
            <FormControl className={classes.formControlSide} variant="outlined">
              <FormHelperText className={clsx(classes.fontColor1, classes.helperText)}>Password</FormHelperText>
              <ClickAwayListener onClickAway={handleClosePassword}>
                <div
                  className={clsx({
                    [classes.inputSide]: passwordValid === '',
                    [classes.inputSide3]: passwordValid === '' && clickPassword === true,
                    [classes.inputSide2]: passwordValid !== '',
                  })}
                >
                  <input
                    type={showPass === false ? 'password' : ''}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onClick={handleClickPassword}
                    className={classes.input}
                    value={password}
                  />
                  {password.length > 0 && clickPassword === true ? (
                    <CancelIcon className={classes.icon} onClick={cancelPassword} />
                  ) : (
                    ''
                  )}
                  {showPass === true ? (
                    <ShowPassIcon className={classes.icon} onClick={showPassword} />
                  ) : (
                    <HidePassIcon className={classes.icon} onClick={showPassword} />
                  )}
                </div>
              </ClickAwayListener>
              <FormHelperText className={classes.error}>{passwordValid === '' ? '' : passwordValid}</FormHelperText>
            </FormControl>
          </div>

          <div className={classes.capcha}>
            {/* <Reaptcha sitekey="6LcgEo0dAAAAALYB_CGQS9O_2aFTR6VEsHNVeWiF" onVerify={onVerify} theme="light" />
            <FormHelperText className={clsx(classes.fontColor1, classes.helperText2)}>
              {capchaValid.length > 0 ? capchaValid : ''}
            </FormHelperText> */}
            <button className={classes.registerBtn} type="submit">
              Log In
            </button>
          </div>
        </form>

        <div className={classes.btnSide2}>
          {/* <Link className={classes.forgotLink} to="/reset-password">
            Forgot password?
          </Link> */}
          <Link to="/register" className={classes.loginLink2}>
            Register Now
          </Link>
        </div>
        {alert.length === 0 ? (
          ''
        ) : (
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={handleCloseNotification}
            open={openNotification}
            autoHideDuration={3000}
          >
            <Alert
              className={
                loginInfo.Success === false ? classes.notificationBackground1 : classes.notificationBackground2
              }
              severity={loginInfo.Success === true ? 'success' : 'error'}
            >
              {alert}
            </Alert>
          </Snackbar>
        )}
      </div>
    </div>
  )
}

export default EmailForm
