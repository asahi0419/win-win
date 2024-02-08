import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useAppSelector } from 'store/hooks'
import { alertMessage, alertSeverity } from 'store/alert/selectors'
import { showAlert } from 'store/alert'
import { useAppDispatch } from 'store/hooks'

function AlertMsg(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function Alert() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const msg = useAppSelector(alertMessage)
  const severity = useAppSelector(alertSeverity)
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (msg.length !== 0) {
      setOpen(true)
    }
  }, [msg, severity])

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(showAlert({ message: '', severity: severity }))
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <AlertMsg onClose={handleClose} severity={severity}>
          {msg}
        </AlertMsg>
      </Snackbar>
    </div>
  )
}
