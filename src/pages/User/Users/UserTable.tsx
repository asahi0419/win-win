import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import SearchBar from 'material-ui-search-bar'
import Table from '@material-ui/core/Table'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { IconButton, ClickAwayListener } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Popper from '@material-ui/core/Popper'
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch'
import { EmailType, PhoneType } from 'config/constants'
import Balance from './Balance'
import { showAlert } from 'store/alert'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectUserDelete, selectUserListRowCount, selectUserUpdate } from 'store/User/Users/selectors'
import { getUsersFilter, deleteUser } from 'store/User/Users'
import { emailVerify, phoneVerify } from 'store/User/Users/actions'

import useStyles from '../styles'

interface alertProps {
  id: string | undefined
  open: boolean
  anchorEl: HTMLElement | null
  onClickAway: () => void
  userId: string
  classes: any
  updateConfirm: boolean
}

function UserBalance(props: alertProps) {
  return (
    <Popper id={props.id} open={props.open} anchorEl={props.anchorEl}>
      <ClickAwayListener onClickAway={props.onClickAway}>
        <Paper>
          <Balance id={props.userId} updateConfirm={props.updateConfirm} />
        </Paper>
      </ClickAwayListener>
    </Popper>
  )
}

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string
}
interface Props extends SwitchProps {
  classes: Styles
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 37,
      height: 20,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 18,
      height: 18,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: '#F50057',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
})

export default function Users(props: { handleClickOpen: () => void; setCurrentId: any; userDetail: any; status: any }) {
  const classes = useStyles()
  const data = props.userDetail

  const [searched, setSearched] = useState<string>('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [keyword, setKeyword] = useState('')
  const [sendData, setSendData] = useState('')

  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [anchor2, setAnchor2] = useState<null | HTMLElement>(null)
  const [balanceopen, setBalanceOpen] = useState(false)
  const [userId, setUserId] = useState('')
  const [success, setSuccess] = useState(false)
  const [deleteId, setDeleteId] = useState(0)

  const handleChangeEmail = (event: any, id: any, emailVerification: any) => {
    const formData = new FormData()
    formData.append('user_id', id)
    formData.append(
      'status',
      emailVerification === EmailType.EMAIL_VERIFIED
        ? EmailType.EMAIL_NOT_VERIFIED.toString()
        : EmailType.EMAIL_VERIFIED.toString(),
    )

    emailVerify(formData).then((res: any) => {
      if (res === undefined) {
        dispatch(showAlert({ message: 'Network connection error', severity: 'error' }))
        return
      } else if (res.Success) {
        dispatch(showAlert({ message: 'Successfully Email Verification Updated', severity: 'success' }))
      } else {
        dispatch(showAlert({ message: 'Failed Email Verification', severity: 'error' }))
      }
      setSuccess(!success)
    })
  }

  const handleChangePhone = (event: any, id: any, phoneVerification: any) => {
    const formData = new FormData()
    formData.append('user_id', id)
    formData.append(
      'status',
      phoneVerification === PhoneType.PHONE_VERIFIED
        ? PhoneType.PHONE_NOT_VERIFIED.toString()
        : PhoneType.PHONE_VERIFIED.toString(),
    )

    phoneVerify(formData).then((res: any) => {
      if (res === undefined) {
        dispatch(showAlert({ message: 'Network connection error', severity: 'error' }))
        return
      } else if (res.Success) {
        dispatch(showAlert({ message: 'Successfully Phone Verification Updated', severity: 'success' }))
      } else {
        dispatch(showAlert({ message: 'Failed Phone Verification', severity: 'error' }))
      }
      setSuccess(!success)
    })
  }

  const ViewBalance = (event: any, id: any) => {
    setUserId(id)
    setAnchor2(event.currentTarget)
    setBalanceOpen(!balanceopen)
  }

  const id = open ? 'simple-popper' : undefined
  const balid = balanceopen ? 'simple-popper' : undefined

  const requestSearch: any = (searchedVal: string) => {
    setKeyword(searchedVal)
  }

  const cancelSearch = () => {
    setSearched('')
    requestSearch(searched)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // const data = useAppSelector(selectUserList)
  const count = useAppSelector(selectUserListRowCount)
  const updateConfirm = useAppSelector(selectUserUpdate)
  const delconfirm = useAppSelector(selectUserDelete)

  useEffect(() => {
    const formData = new FormData()
    formData.append('cur_page', page.toString())
    formData.append('per_page', rowsPerPage.toString())
    formData.append('keyword', keyword)
    dispatch(getUsersFilter(formData))

    if (delconfirm) {
      dispatch(showAlert({ message: 'Successfully deleted', severity: 'success' }))
    }
    if (updateConfirm) {
      dispatch(showAlert({ message: 'Successfully updated', severity: 'success' }))
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendData, page, rowsPerPage, delconfirm, updateConfirm, success, props.status])

  const handleSearch = () => {
    setSendData(keyword)
  }

  const onClickDelete = (event: any, id: any) => {
    setAnchorEl(event.currentTarget)
    setOpen(!open)
    setDeleteId(id)
  }

  const delContact = () => {
    setOpen(false)

    const formData = new FormData()
    formData.append('user_id', deleteId.toString())
    dispatch(deleteUser(formData))
  }

  const handleClickAway = () => {
    setOpen(false)
    setBalanceOpen(false)
  }

  return (
    <Paper className={classes.cdephis} variant="outlined">
      <span style={{ fontSize: '20px' }}>Users Info</span>

      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        onRequestSearch={() => handleSearch()}
        className={classes.search}
      />
      <Button variant="contained" size="large" className={classes.draw} onClick={props.handleClickOpen}>
        + Add User
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper className={classes.delconfirm}>
            <span>Are you OK?</span>
            <br />
            <div className={classes.btngroup}>
              <Button
                className={classes.delete}
                size="small"
                onClick={() => {
                  delContact()
                }}
              >
                Delete
              </Button>
              <Button className={classes.cancel} onClick={handleClickAway} size="small">
                Cancel
              </Button>
            </div>
          </Paper>
        </ClickAwayListener>
      </Popper>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className={classes.thead}>
              <TableCell align="left" className={classes.thtitle}>
                UserID
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                Email
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                Phone
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                Role
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                Balance
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                EmailVerified
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                PhoneVerified
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {data ? (
            <TableBody>
              {data &&
                data.map((row: any, key: any) => (
                  <TableRow key={key} hover>
                    <TableCell className={classes.tbody}>{row.Id}</TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      <div className={classes.tbOverflow}>{row.Email}</div>
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      {row.PhoneNumber}
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      <div className={classes.tbOverflow}>{row.Role}</div>
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      <span style={{ cursor: 'pointer', color: 'blue' }} onClick={(e) => ViewBalance(e, row.Id)}>
                        View More
                      </span>
                    </TableCell>
                    <TableCell align="center" className={classes.tbody}>
                      <IOSSwitch
                        checked={row.EmailVerify === EmailType.EMAIL_VERIFIED ? true : false}
                        onChange={(e) => handleChangeEmail(e, row.Id, row.EmailVerify)}
                        name="checkedEmail"
                      />
                    </TableCell>
                    <TableCell align="center" className={classes.tbody}>
                      <IOSSwitch
                        checked={row.PhoneVerify === PhoneType.PHONE_VERIFIED ? true : false}
                        onChange={(e) => handleChangePhone(e, row.Id, row.PhoneVerify)}
                        name="checkedPhone"
                      />
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          props.setCurrentId(row.Id)
                          props.handleClickOpen()
                        }}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      |
                      <IconButton color="secondary" onClick={(e) => onClickDelete(e, row.Id)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell className={classes.nodata} align="center" colSpan={12}>
                  There is no user data
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <UserBalance
        id={balid}
        open={balanceopen}
        anchorEl={anchor2}
        onClickAway={handleClickAway}
        userId={userId}
        classes={classes}
        updateConfirm={updateConfirm}
      />
    </Paper>
  )
}
