import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { createUser } from 'store/User/Users/actions'
import { showAlert } from 'store/alert'
import { useAppDispatch } from 'store/hooks'

import useStyles from '../styles'

export default function FormDialog(props: {
  currentId: any
  setCurrentId: any
  open: any
  handleClose: any
  userDetail: any
}) {
  const classes = useStyles()
  const initialState = {
    email: '',
    password: '',
    phone: '',
    emailValid: '',
  }

  const [userState, setUserState]: any = useState(initialState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    props.currentId > 0
      ? props.userDetail.map((list: any) => {
          if (list.Id === props.currentId) {
            setUserState({
              email: list.Email,
              password: '',
              role: list.Role,
              phone: list.PhoneNumber,
              emailValid: '',
              passwordVaild: '',
              roleValid: '',
            })
            return 0
          }
          return 0
        })
      : setUserState(initialState)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId])

  const handleEmailChange = (value: any) => {
    setUserState((previousState: any) => {
      return { ...previousState, email: value }
    })
    let regEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regEmail.test(value)) {
      setUserState((previousState: any) => {
        return { ...previousState, emailValid: 'Entered value does not match email format.' }
      })
    } else {
      setUserState((previousState: any) => {
        return { ...previousState, emailValid: '' }
      })
    }
  }

  const handlePassowrdChange = (value: any) => {
    setUserState((previousState: any) => {
      return { ...previousState, password: value }
    })
  }
  const handlePhoneChange = (value: any) => {
    setUserState((previousState: any) => {
      return { ...previousState, phone: value }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (userState.email.length === 0) {
      setUserState((previousState: any) => {
        return { ...previousState, emailValid: 'Please insert email' }
      })
    } else if (userState.password.length === 0) {
      setUserState((previousState: any) => {
        return { ...previousState, passwordValid: 'Please insert password' }
      })
    } else {
      const formData = new FormData()
      formData.append('email', userState.email)
      formData.append('password', userState.password)
      formData.append('phonenumber', userState.phone)
      // props.currentId === 0
      //   ?
      createUser(formData).then((res) => {
        if (res === undefined) {
          dispatch(showAlert({ message: 'Network connection error', severity: 'error' }))
          return
        } else if (res.Success) {
          dispatch(showAlert({ message: 'Successfully New User Created', severity: 'success' }))
        } else {
          dispatch(showAlert({ message: res.Error.Msg, severity: 'error' }))
        }
        setUserState(initialState)
        props.handleClose()
      })
      // : updateUserList(formData).then((res) => {
      //     if (res === undefined) {
      //       dispatch(showAlert({ message: 'Network connection error', severity: 'error' }))
      //       return
      //     } else if (res.Success) {
      //       dispatch(showAlert({ message: 'Successfully User Updated', severity: 'success' }))
      //     } else {
      //       dispatch(showAlert({ message: 'Failed User Update', severity: 'error' }))
      //     }
      //     props.handleClose()
      //     setUserState(initialState)
      //   })
    }

    // dispatch(createUser(formData))
  }
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth aria-labelledby="form-dialog-title">
        <div className={classes.userForm}>
          <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">{props.currentId === 0 ? 'Create' : 'Update'} User</DialogTitle>
            <DialogContent>
              <DialogContentText>Please insert user information.</DialogContentText>
              <TextField
                margin="normal"
                id="email"
                label="Email Address"
                type="text"
                value={userState.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                fullWidth
              />
              <span className={classes.error}>{userState.emailValid}</span>

              <TextField
                margin="normal"
                id="password"
                label="Password"
                type="password"
                value={userState.password}
                onChange={(e) => handlePassowrdChange(e.target.value)}
                fullWidth
              />
              <span className={classes.error}>{userState.passwordValid}</span>

              <TextField
                margin="normal"
                id="phone"
                label="Phone Number"
                value={userState.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button className={classes.button} type="submit">
                {props.currentId === 0 ? 'Create' : 'Update'} User
              </Button>
              <Button onClick={props.handleClose} className={classes.cancel}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  )
}
