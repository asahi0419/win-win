import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { TextField, Snackbar } from '@material-ui/core'
import Table from './components/Table'
import TableInfo from './components/TableInfo'

// import { ChatType } from '../../../constants'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { notification } from '../../store/notification/selectors'
import { getNotification } from '../../store/notification'
import { REQUEST_API_URL } from '../../config/config'
import { NotificationType } from '../../constants'
import { useStyles } from './Style'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function Notification() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const columns = ['ID', 'Content', 'Status', 'Time', 'Option']
  const [alert, setAlert] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertText, setAlertText] = useState('')

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(50)

  const handleCloseAlert = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  useEffect(() => {
    const getNotifications = () => {
      const formData = new FormData()
      formData.append('status', NotificationType.NOTIFICATION_ALL.toString())

      dispatch(getNotification(formData))
    }
    getNotifications()
  }, [dispatch])

  const notificationData = useAppSelector(notification)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(Number(event.target.value))
    setPage(0)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const rowsCnt = notificationData?.length

  const [content, setContent] = React.useState('')
  const handleContent = (e: string) => {
    setContent(e)
  }

  const handleSave = async (e: any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('message', content)

    var jwtToken = localStorage.getItem('jwtToken')
    const res = await axios.post(`${REQUEST_API_URL}/admin/notification/add`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })

    setContent('')
    setOpenAlert(true)
    setAlert(res.data.Success)
    setAlertText(res.data.Error.Msg)

    const getNotificationFormData = new FormData()
    getNotificationFormData.append('status', NotificationType.NOTIFICATION_ALL.toString())

    dispatch(getNotification(getNotificationFormData))
  }

  return (
    <div style={{ width: '100%', display: 'block' }}>
      <div className={classes.root}>
        <TextField
          id="outlined-basic"
          onChange={(e) => handleContent(e.target.value)}
          className={classes.textField}
          label="Content"
          size="small"
          variant="outlined"
          value={content}
        />
        <button onClick={handleSave} className={classes.btn}>
          Add
        </button>
      </div>
      <div style={{ width: '100%' }}>
        <Table
          tableInfo={() => TableInfo(rowsCnt, rowsPerPage)}
          rowsPerPage={rowsPerPage}
          rowsCnt={rowsCnt}
          page={page}
          rows={notificationData}
          columns={columns}
          // emptyRows={emptyRows}
          handleChange={handleChange}
          handleChangePage={handleChangePage}
        />
      </div>
      {alert === undefined ? (
        ''
      ) : (
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handleCloseAlert}
          open={openAlert}
          autoHideDuration={3000}
        >
          <Alert
            style={alert === false ? { background: '#bf2d29' } : { background: '#0ECB81' }}
            severity={alert === true ? 'success' : 'error'}
          >
            {alert === true ? 'Save Success' : alertText}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}

export default Notification
