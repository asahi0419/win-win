import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import SearchBar from 'material-ui-search-bar'
import Table from '@material-ui/core/Table'
import { IconButton, ClickAwayListener } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Popper from '@material-ui/core/Popper'

import { showAlert } from 'store/alert'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectICOUserListCount, selectICOUserDelete } from 'store/User/ICOUsers/selectors'
import { getICOUsers, deleteICOUser } from 'store/User/ICOUsers'

import useStyles from '../styles'

export default function ICOUsers(props: { userDetail: any }) {
  const classes = useStyles()
  const data = props.userDetail

  const [searched, setSearched] = useState<string>('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [keyword, setKeyword] = useState('')
  const [sendData, setSendData] = useState('')
  const [deleteId, setDeleteId] = useState(0)

  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)

  const id = open ? 'simple-popper' : undefined

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

  const count = useAppSelector(selectICOUserListCount)
  const delconfirm = useAppSelector(selectICOUserDelete)

  useEffect(() => {
    const formData = new FormData()
    formData.append('cur_page', page.toString())
    formData.append('per_page', rowsPerPage.toString())
    formData.append('keyword', keyword)
    dispatch(getICOUsers(formData))

    if (delconfirm) {
      dispatch(showAlert({ message: 'Successfully deleted', severity: 'success' }))
    }
  }, [dispatch, sendData, page, rowsPerPage, keyword, delconfirm])

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
    dispatch(deleteICOUser(formData))
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  return (
    <Paper className={classes.cdephis} variant="outlined">
      <span style={{ fontSize: '20px' }}>ICO User List</span>

      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        onRequestSearch={() => handleSearch()}
        className={classes.search}
      />
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
                First Name
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                Last Name
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                Address
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                ETH
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                BNB
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                ZNX
              </TableCell>
              <TableCell align="left" className={classes.thtitle}>
                Wallet
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
                      {row.Email}
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      {row.FirstName}
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      {row.LastName}
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      {row.Address}
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      {row.ETH}
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      {row.BNB}
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      {row.ZNX}
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
                      {row.WalletAddr}
                    </TableCell>
                    <TableCell align="left" className={classes.tbody}>
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
                  There is no ICO user datas
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
    </Paper>
  )
}
