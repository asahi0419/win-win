import React from 'react'
import axios from 'axios'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
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
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CoinPairEditModal from './CoinPairEditModal'

import { useAppDispatch } from '../../../store/hooks'
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
import { REQUEST_API_URL } from '../../../config/config'
import { getCoinPairList } from '../../../store/Setting/action'

interface CoinPairTableProps {
  rowsPerPage: number
  page: number
  rowsCnt: number
  rows: any
  columns: string[]
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void
}

function CoinPairTable({
  rowsPerPage,
  page,
  rows,
  columns,
  rowsCnt,
  handleChange,
  handleChangePage,
}: CoinPairTableProps) {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    handleChangePage(event, newPage)
  }

  const onSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    handleChange(event)
  }

  const [open, setOpen] = React.useState(false)
  const [currentId, setCurrentId] = React.useState(0)

  const handleEditModalOpen = () => {
    setOpen(true)
  }

  const handleEditModalClose = () => {
    setOpen(false)
  }

  //-------------delete----------------------
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState('')

  const handleDeleteConfirm = (id: any) => {
    setDeleteId(id)
    setConfirmOpen(true)
  }

  const handleDelete = async () => {
    const formData = new FormData()
    formData.append('pair_id', deleteId)

    var jwtToken = localStorage.getItem('jwtToken')
    const res = await axios.post(`${REQUEST_API_URL}/admin/coinpair/delete`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    if (res.data?.Success) {
      setConfirmOpen(false)
      dispatch(getCoinPairList())
    }
  }

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setConfirmOpen(false)
  }

  return (
    <>
      <CoinPairEditModal
        open={open}
        handleClose={handleEditModalClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <Paper elevation={3} className={classes.root}>
        <StyledTableControlBox mb="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCurrentId(0)
              handleEditModalOpen()
            }}
          >
            <AddIcon />
            Add
          </Button>
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
                  <StyledTableCell>{rowsPerPage * page + key + 1}</StyledTableCell>
                  <StyledTableCell>{row.Pair}</StyledTableCell>
                  <StyledTableCell>
                    <Tooltip title="Edit" arrow>
                      <IconButton className={classes.editBtn}>
                        <EditIcon className={classes.editIcon} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton className={classes.deleteBtn} onClick={() => handleDeleteConfirm(row.Id)}>
                        <DeleteIcon className={classes.deleteIcon} />
                      </IconButton>
                    </Tooltip>
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
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
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
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={confirmOpen}
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
    </>
  )
}

export default CoinPairTable
