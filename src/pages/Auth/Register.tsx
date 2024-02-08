import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import CancelIcon from '@material-ui/icons/Cancel'
import ShowPassIcon from '@material-ui/icons/Visibility'
import HidePassIcon from '@material-ui/icons/VisibilityOff'
import { FormControl, FormHelperText, ClickAwayListener, Typography, Snackbar, Tooltip } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
// import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { createUser } from 'store/auth'
import { useStyles } from './Style'
import { createAuth } from 'store/auth/selectors'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function EmailForm() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const registerInfo = useAppSelector(createAuth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [emailValid, setEmailValid] = useState('')
  const [alert, setAlert] = React.useState('')
  const [passwordValid, setPasswordValid] = useState('')
  const [confirmSide, setConfirmSide] = React.useState(true)
  const [openNotification, setOpenNotification] = React.useState(false)
  const [confirmValid, setConfirmValid] = useState('')
  const [upperCnt, setUpperCnt] = useState(0)
  const [numberCnt, setNumberCnt] = useState(0)

  useEffect(() => {
    if (registerInfo !== undefined) {
      if (registerInfo.Success === false) {
        if (registerInfo.Error !== undefined) {
          setAlert(registerInfo.Error.Email)
          setOpenNotification(true)
        }
      }
    }
  }, [registerInfo])

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

  const handlePasswordChange = (value: any) => {
    setPassword(value)
    if (password.length < 7 || upperCnt === 0 || numberCnt === 0) {
      setPasswordValid('Password must be at least 8 characters with 1 upper case letter and 1 number.')
    } else {
      setPasswordValid('')
    }

    let upper = 0
    let number = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] >= 'A' && value[i] <= 'Z') {
        upper++
      } else if (value[i] >= '0' && value[i] <= '9') number++
    }
    setUpperCnt(upper)
    setNumberCnt(number)
  }

  const handleConfirmChange = (value: any) => {
    setConfirm(value)
    if (password !== value) {
      setConfirmValid('Password does not match, please check again.')
    } else {
      setConfirmValid('')
    }
  }

  const idSelect = (e: boolean) => {
    setConfirmSide(e)
  }

  //----------------------------notification-----------------------------------------
  const handleCloseNotification = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenNotification(false)
  }
  //-------------------------------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (email.length === 0 && password.length === 0 && confirm.length === 0) {
      setEmailValid('Please enter your email.')
      setPasswordValid('Please enter your password.')
      setConfirmValid('Please enter your confirm password.')
    } else if (email.length === 0 && password.length === 0) {
      setEmailValid('Please enter your email.')
      setPasswordValid('Please enter your password.')
    } else if (email.length === 0 && confirm.length === 0) {
      setEmailValid('Please enter your email.')
      setConfirmValid('Please enter your confirm password.')
    } else if (password.length === 0 && confirm.length === 0) {
      setPasswordValid('Please enter your password.')
      setConfirmValid('Please enter your confirm password.')
    } else if (password !== confirm) {
      setConfirmValid('Password does not match, please check again.')
    } else {
      if (password.length > 7 && upperCnt !== 0 && numberCnt !== 0) {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirmpassword', confirm)
        dispatch(createUser(formData))
      }
    }
  }

  const cancelEmail = () => {
    setEmail('')
  }

  const cancelPassword = () => {
    setPassword('')
  }

  const cancelConfirmPassword = () => {
    setConfirm('')
  }

  const [showPass, setShowPass] = React.useState(false)
  const showPassword = () => {
    setShowPass(!showPass)
  }

  const [showConfirmPass, setShowConfirmPass] = React.useState(false)
  const showConfirmPassword = () => {
    setShowConfirmPass(!showConfirmPass)
  }

  const [clickPassword, setClickPassword] = useState(false)
  const [clickConfirmPass, setClickConfirmPass] = useState(false)
  const [clickEmail, setClickEmail] = useState(false)
  const [passwordTooltip, setPasswordTooltip] = useState(false)

  const handleClickPassword = () => {
    setClickPassword(true)
    setPasswordTooltip(true)
  }
  const handleClickConfirmPass = () => {
    setClickConfirmPass(true)
  }
  const handleClickEmail = () => {
    setClickEmail(true)
  }
  const handleCloseEmail = () => {
    setClickEmail(false)
  }
  const handleTooltipClose = () => {
    setPasswordTooltip(false)
    setClickPassword(false)
  }
  const handleCloaseConfirm = () => {
    setClickConfirmPass(false)
  }

  return (
    <div className={classes.authForm}>
      <img src="/logo.svg" alt="logo" width={200} />
      <form onSubmit={handleSubmit}>
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
                onClick={handleClickEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
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

        <FormControl className={classes.formControlSide} variant="outlined">
          <FormHelperText className={clsx(classes.fontColor1, classes.helperText)}>Password</FormHelperText>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={passwordTooltip}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="right"
              // leaveDelay={200}
              classes={{ tooltip: classes.passwordTooltipDiv }}
              title={
                <div className={classes.strongPasswordDiv}>
                  <Typography className={classes.strongPasswordText}>
                    {password.length < 8 ? (
                      <CloseIcon className={classes.icon5} />
                    ) : (
                      <CheckIcon className={classes.icon6} />
                    )}
                    Maximum 8 characters
                  </Typography>
                  <Typography className={classes.strongPasswordText}>
                    {numberCnt === 0 ? (
                      <CloseIcon className={classes.icon5} />
                    ) : (
                      <CheckIcon className={classes.icon6} />
                    )}
                    At least 1 number
                  </Typography>
                  <Typography className={classes.strongPasswordText}>
                    {upperCnt === 0 ? <CloseIcon className={classes.icon5} /> : <CheckIcon className={classes.icon6} />}
                    At least 1 upper case
                  </Typography>
                </div>
              }
            >
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
            </Tooltip>
          </ClickAwayListener>
          <FormHelperText className={classes.error}>{passwordValid === '' ? '' : passwordValid}</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControlSide} variant="outlined">
          {confirmSide === false ? (
            <FormHelperText
              // onClick={() => idSelect(true)}
              className={clsx(classes.fontColor1, classes.idText)}
            >
              Confirm Password
              {/* <ArrowDropDownIcon style={{ verticalAlign: 'middle' }} /> */}
            </FormHelperText>
          ) : (
            <>
              <FormHelperText onClick={() => idSelect(false)} className={classes.fontColor1}>
                Confirm Password
                {/* <ArrowDropUpIcon style={{ verticalAlign: 'middle' }} /> */}
              </FormHelperText>
              <ClickAwayListener onClickAway={handleCloaseConfirm}>
                <div
                  className={clsx({
                    [classes.inputSide]: confirmValid === '',
                    [classes.inputSide3]: confirmValid === '' && clickConfirmPass === true,
                    [classes.inputSide2]: confirmValid !== '',
                  })}
                >
                  <input
                    type={showConfirmPass === false ? 'password' : ''}
                    onChange={(e) => handleConfirmChange(e.target.value)}
                    onClick={handleClickConfirmPass}
                    className={classes.input}
                    value={confirm}
                  />
                  {confirm.length > 0 && clickConfirmPass === true ? (
                    <CancelIcon className={classes.icon} onClick={cancelConfirmPassword} />
                  ) : (
                    ''
                  )}
                  {showConfirmPass === true ? (
                    <ShowPassIcon className={classes.icon} onClick={showConfirmPassword} />
                  ) : (
                    <HidePassIcon className={classes.icon} onClick={showConfirmPassword} />
                  )}
                </div>
              </ClickAwayListener>

              <FormHelperText className={classes.error}>{confirmValid === '' ? '' : confirmValid}</FormHelperText>
            </>
          )}
        </FormControl>
        <div>
          <button className={classes.registerBtn} type="submit">
            Create Account
          </button>
        </div>
      </form>
      <div className={classes.btnSide}>
        <Typography variant="body2" className={classes.fontColor5}>
          Already registered?
        </Typography>
        <Link to="/login" className={classes.loginLink}>
          Log In
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
              registerInfo.Success === false ? classes.notificationBackground1 : classes.notificationBackground2
            }
            severity={registerInfo.Success === true ? 'success' : 'error'}
          >
            {alert}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}

export default EmailForm
