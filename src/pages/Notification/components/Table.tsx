import React, { useState } from 'react'
import axios from 'axios'
//material-ui components
import {
  TableBody,
  TableRow,
  Paper,
  Table,
  Box,
  TableContainer,
  TableHead,
  IconButton,
  Tooltip,
  Snackbar,
  Button,
} from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { REQUEST_API_URL } from '../../../config/config'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { getNotification } from '../../../store/notification'
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff'
import { NotificationType } from '../../../constants'
import { useAppDispatch } from '../../../store/hooks'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Modal from './Modal'
//style
import {
  StyledTableCell,
  StyledTableHead,
  StyledTableControlBox,
  StyledTablePagination,
  StyledRowsPerPageBox,
  StyledNativeSelect,
  BootstrapInput,
  useStyles,
} from '../Style'
import TablePaginationActions from './Pagination'

interface CustomizedTableProps {
  tableInfo: () => void
  rowsPerPage: number
  page: number
  rowsCnt: number
  rows: any
  columns: string[]
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const CustomizedTable: React.FC<CustomizedTableProps> = ({
  tableInfo,
  rowsPerPage,
  page,
  rows,
  columns,
  rowsCnt,
  handleChange,
  handleChangePage,
}) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [alert, setAlert] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertText, setAlertText] = useState('')

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    handleChangePage(event, newPage)
  }

  const onSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    handleChange(event)
  }

  const handleCloseAlert = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  //-------------delete----------------------
  const [open, setOpen] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState('')

  const handleDeleteConfirm = (id: any) => {
    setDeleteId(id)
    setOpen(true)
  }

  const handleDelete = async () => {
    const formData = new FormData()
    formData.append('notification_id', deleteId)

    var jwtToken = localStorage.getItem('jwtToken')
    const res = await axios.post(`${REQUEST_API_URL}/admin/notification/delete`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })

    setOpen(false)
    getNotificationData()
    setOpenAlert(true)
    setAlert(res.data.Success)
    setAlertText(res.data.Error.Msg)
  }

  //-----------------------------------------------

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const getNotificationData = () => {
    const getNotificationFormData = new FormData()
    getNotificationFormData.append('status', NotificationType.NOTIFICATION_ALL.toString())
    dispatch(getNotification(getNotificationFormData))
  }

  //--------------active or inactive-------------------

  const handleActive = async (e: any, id: any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('notification_id', id)

    var jwtToken = localStorage.getItem('jwtToken')
    const res = await axios.post(`${REQUEST_API_URL}/admin/notification/inactive`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    setOpenAlert(true)
    setAlert(res.data.Success)
    setAlertText(res.data.Error.Msg)
    getNotificationData()
  }

  const handleInActive = async (e: any, id: any) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('notification_id', id)

    var jwtToken = localStorage.getItem('jwtToken')
    const res = await axios.post(`${REQUEST_API_URL}/admin/notification/active`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    setOpenAlert(true)
    setAlert(res.data.Success)
    setAlertText(res.data.Error.Msg)
    getNotificationData()
  }
  //---------------------------------------------------------

  const [modalOpen, setModalOpen] = React.useState(false)

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const [updateId, setUpdateId] = useState('')
  const [msg, setMsg] = useState('')
  const handleUpdate = (id: any, msg: any) => {
    setModalOpen(true)
    setUpdateId(id)
    setMsg(msg)
  }

  return (
    <Paper elevation={3} className={classes.root}>
      <Modal open={modalOpen} handleClose={handleModalClose} updateId={updateId} msg={msg} />
      <StyledTableControlBox mb="20px">
        <Box>{tableInfo}</Box>
      </StyledTableControlBox>
      <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
        <Table stickyHeader>
          <StyledTableHead>
            <TableRow>
              {columns.map((column: any, key: any) => {
                return <StyledTableCell key={key}>{column}</StyledTableCell>
              })}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, key: number) => (
              <TableRow key={key}>
                <StyledTableCell>{key + 1}</StyledTableCell>
                <StyledTableCell>{row.Message}</StyledTableCell>
                <StyledTableCell>{row.Status === 1 ? 'Active' : 'Inactive'}</StyledTableCell>
                <StyledTableCell>{new Date(row.CreatedAt * 1000).toLocaleString('en-GB')}</StyledTableCell>
                <StyledTableCell style={{ display: 'flex' }}>
                  <Tooltip title="Edit" onClick={(e) => handleUpdate(row.Id, row.Message)} arrow>
                    <IconButton className={classes.editBtn}>
                      <EditIcon className={classes.editIcon} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <IconButton onClick={(e) => handleDeleteConfirm(row.Id)} className={classes.deleteBtn}>
                      <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                  </Tooltip>
                  {row.Status === 1 ? (
                    <Tooltip title="Active" arrow>
                      <div onClick={(e) => handleActive(e, row.Id)} className={classes.activeBtn}>
                        <NotificationsIcon className={classes.activeIcon} />
                        <div className={classes.selectBtn} />
                      </div>
                    </Tooltip>
                  ) : (
                    <Tooltip title="InActive" arrow>
                      <div onClick={(e) => handleInActive(e, row.Id)} className={classes.inactiveBtn}>
                        <div className={classes.inselectBtn} />
                        <NotificationsOffIcon className={classes.inactiveIcon} />
                      </div>
                    </Tooltip>
                  )}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledTableControlBox my="12px">
        <Box>
          <StyledRowsPerPageBox>
            Show
            <StyledNativeSelect
              id="demo-customized-select-native"
              value={rowsPerPage}
              onChange={onSelectChange}
              input={<BootstrapInput />}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </StyledNativeSelect>
            Records
          </StyledRowsPerPageBox>
        </Box>
        <Box>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTablePagination
                  colSpan={3}
                  count={rowsCnt}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={onPageChange}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableHead>
          </Table>
        </Box>
      </StyledTableControlBox>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        // autoHideDuration={6000}
        onClose={handleClose}
        message="Are you sure you want to delete?"
      >
        <div className={classes.alertDiv}>
          <ErrorOutlineIcon className={classes.errorIcon} />
          Are you sure you want to delete?
          <div>
            <Button size="small" className={classes.okBtn} onClick={handleDelete}>
              Ok
            </Button>
            <Button size="small" className={classes.cancelBtn1} onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Snackbar>
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
            {alert === true ? 'Success' : alertText}
          </Alert>
        </Snackbar>
      )}
    </Paper>
  )
}

export default CustomizedTable
