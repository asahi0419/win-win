import React from 'react'
import clsx from 'clsx'
// @material-ui/core
import { Divider, OutlinedInput, InputAdornment, Grid } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
// customized components
import Button from '../../../components/CustomButtons/Button'
import CustomDataTable from '../../../components/Table1/CustomDataTable'
import { useStyles } from '../Style'
// hook & actions
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getSignInLogsFilter, updateSignInLog, deleteSignInLog } from '../../../store/User/SignInLog'
import { selectSignInLogList, selectSignInLogListRowCount } from '../../../store/User/SignInLog/selectors'
import { getPermissionsFilter } from '../../../store/User/Permissions'
import { STATUS } from '../../../constants'
import SignInLogForm from './SignInLogForm'

interface Column {
  id: 'id' | 'userName' | 'typeOf' | 'content' | 'operatingIP' | 'status' | 'option'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: Column[] = [
  { id: 'id', label: 'ID', minWidth: 80 },
  { id: 'userName', label: 'UserName', minWidth: 100 },
  { id: 'typeOf', label: 'TypeOf', minWidth: 170 },
  { id: 'content', label: 'Content', minWidth: 150 },
  { id: 'operatingIP', label: 'OperatingIP', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'option', label: 'Option', minWidth: 240 },
]

export function SignInLog() {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const [searchStatus, setSearchStatus] = React.useState(0)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [fieldName, setFieldName] = React.useState('')
  const [fieldValue, setFieldValue] = React.useState('')

  const [open, setOpen] = React.useState(false)
  const [currentId, setCurrentId] = React.useState(0)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  //-----------------------DataTable Logic-----------------------------------------
  const rows = useAppSelector(selectSignInLogList)
  const rowsCount = useAppSelector(selectSignInLogListRowCount)

  const refreshTable = () => {
    const formData = new FormData()
    formData.append('status', String(searchStatus))
    formData.append(fieldName, fieldValue)
    formData.append('rowsPerPage', String(rowsPerPage))
    formData.append('page', String(page))
    dispatch(getSignInLogsFilter(formData))
  }

  React.useState(() => {
    dispatch(getPermissionsFilter({ status: STATUS.VALID }))
    refreshTable()
  })

  //----------------------Search Bar Logic--------------------------------

  const searchStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchStatus(event.target.value as number)
    refreshTable()
  }

  const fieldNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldName(event.target.value as string)
    refreshTable()
  }

  const fieldValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldValue(event.target.value as string)
    refreshTable()
  }
  //--------------------------Button Functions----------------------------------------
  const deleteBtnClicked = (id: string) => {
    dispatch(deleteSignInLog(id))
  }

  const enableBtnClicked = (id: number) => {
    dispatch(updateSignInLog({ id: id, status: STATUS.VALID }))
  }

  const disableBtnClicked = (id: number) => {
    dispatch(updateSignInLog({ id: id, status: STATUS.INVALID }))
  }

  //-----------------------------------------------------------------
  return (
    <React.Fragment>
      <SignInLogForm open={open} handleClose={handleClose} currentId={currentId} setCurrentId={setCurrentId} />
      <Grid spacing={3} container>
        <Grid item xs={12}>
          <h2>SignInLog Management</h2>
          <Divider />
        </Grid>
        <Grid item xs={2} md={4}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.searchBtn}
            onClick={() => {
              setCurrentId(0)
              handleClickOpen()
            }}
          >
            Add
          </Button>
        </Grid>
        <Grid item xs={8} md={8} container justifyContent="flex-end">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
            <Select
              className={classes.select}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={searchStatus}
              onChange={searchStatusChange}
              label="status"
            >
              <MenuItem value={0}>
                <em>ALL</em>
              </MenuItem>
              <MenuItem value={1}>Enabled</MenuItem>
              <MenuItem value={2}>Disabled</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Field</InputLabel>
            <Select
              className={classes.select}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={fieldName}
              onChange={fieldNameChange}
              label="field"
            >
              <MenuItem value="">
                <em></em>
              </MenuItem>
              <MenuItem value="userName">userName</MenuItem>
              <MenuItem value="typeOf">typeOf</MenuItem>
              <MenuItem value="content">content</MenuItem>
              <MenuItem value="operatingIP">operatingIP</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              value={fieldValue}
              onChange={fieldValueChange}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              labelWidth={0}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 400, width: '100%' }}>
            <CustomDataTable
              columns={columns}
              rows={rows}
              handleClickOpen={handleClickOpen}
              setCurrentId={setCurrentId}
              page={page}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
              rowsCount={rowsCount}
              deleteBtnClicked={deleteBtnClicked}
              enableBtnClicked={enableBtnClicked}
              disableBtnClicked={disableBtnClicked}
            />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
