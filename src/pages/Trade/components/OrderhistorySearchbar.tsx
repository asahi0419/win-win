import React from 'react'
import axios from 'axios'
import dateFormat from 'dateformat'

import { Grid, Button, Divider } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'

import { useStyles } from '../Style_searchbar'

import { REQUEST_API_URL } from 'config/config'
import { useAppDispatch } from '../../../store/hooks'
import { getOrderHistoryFilter } from '../../../store/Trade/OrderHistory'

export function OrderhistorySearchbar({ ...props }: any) {
  const per_page = props.rowsPerPage
  const cur_page = props.curPage

  const classes = useStyles()
  const dispatch = useAppDispatch()

  const [pairvalues, setPairValues] = React.useState([])
  React.useEffect(() => {
    axios.post(`${REQUEST_API_URL}/coinpair/list`).then((res) => {
      setPairValues(res.data.Data)
    })
  }, [])

  // ---------user_id onchange-----------
  const [user_id, setUserId] = React.useState('')
  const handleUserId = (e: any) => {
    setUserId(e.target.value)
  }

  // ----------order_side onchange-----
  const [order_side, setSide] = React.useState('2')
  const sideChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSide(event.target.value as string)
  }

  // ---------user_id onchange-----------
  const [orderType, setOrderType] = React.useState('')
  const handleOrderType = (e: any) => {
    setOrderType(e.target.value)
  }

  // ----pair onchanges-----
  const [pair, setPair] = React.useState('')
  const handlePair = (e: any) => {
    setPair(e.target.value)
  }

  // -------order_status-----
  const [order_status, setOrderStatus] = React.useState('')
  const handleOrderStatus = (e: any) => {
    setOrderStatus(e.target.value)
  }

  const [start_date, setStartDate] = React.useState(0)
  const handleStartDate = (e: any) => {
    // setStartDate(e)
    const startTimestamp = Date.parse(dateFormat(e)) / 1000
    setStartDate(startTimestamp)
    console.log('first time test', start_date.toString())
  }

  const [end_date, setEndDate] = React.useState(0)
  const handleEndDate = (e: any) => {
    const endTimestamp = Date.parse(dateFormat(e)) / 1000
    setEndDate(endTimestamp)
  }

  React.useEffect(() => {
    const formData = new FormData()
    formData.append('cur_page', cur_page)
    formData.append('per_page', per_page)
    formData.append('user_id', user_id)
    formData.append('order_side', order_side)
    formData.append('order_type', orderType)
    formData.append('pair', pair)
    formData.append('order_status', order_status)
    formData.append('start_date', start_date.toString())
    formData.append('end_date', end_date.toString())

    dispatch(getOrderHistoryFilter(formData))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const formData = new FormData()
    formData.append('cur_page', cur_page)
    formData.append('per_page', per_page)
    dispatch(getOrderHistoryFilter(formData))
  }, [dispatch, cur_page, per_page])

  // ---------Search Fucntion-----
  const Searchfun_orderhistory = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('cur_page', cur_page)
    formData.append('per_page', per_page)
    formData.append('user_id', user_id)
    formData.append('order_side', order_side)
    formData.append('order_type', orderType)
    formData.append('pair', pair)
    formData.append('order_status', order_status)
    formData.append('start_date', start_date.toString())
    formData.append('end_date', end_date.toString())
    dispatch(getOrderHistoryFilter(formData))

    setUserId('')
    setPair('')
    setOrderStatus('')
    setStartDate(0)
    setEndDate(0)
  }

  return (
    <form onSubmit={(e) => Searchfun_orderhistory(e)}>
      <Grid spacing={3} container className={classes.searchDiv}>
        <Grid item xs={12} md={3} sm={6}>
          <TextField
            id="datetime-local"
            type="date"
            variant="outlined"
            label="StartDate"
            className={classes.starttextField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              handleStartDate(e.target.value)
            }}
            // value={start_date}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <TextField
            id="datetime-local"
            type="date"
            variant="outlined"
            label="EndDate"
            className={classes.endtextField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              handleEndDate(e.target.value)
            }}
            // value={end_date}
          />
        </Grid>
      </Grid>
      <Divider style={{ marginTop: '25px', marginBottom: '20px' }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={2} sm={6}>
          <div className={classes.userField}>
            <TextField
              id="outlined-basic"
              size="small"
              label="User ID"
              onChange={handleUserId}
              variant="outlined"
              type="number"
              value={user_id}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={2} sm={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Side</InputLabel>
            <Select
              className={classes.select}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={order_side}
              label="field"
              onChange={sideChange}
            >
              <MenuItem value="2">All</MenuItem>
              <MenuItem value="0">Buy</MenuItem>
              <MenuItem value="1">Sell</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2} sm={6}>
          <div className={classes.userField}>
            <TextField
              id="outlined-basic"
              size="small"
              label="Order Type"
              onChange={handleOrderType}
              variant="outlined"
              value={orderType}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={2} sm={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Pair</InputLabel>
            <Select
              className={classes.select}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={pair}
              label="field"
              onChange={handlePair}
            >
              {pairvalues.map((parivalue: any, key: any) => {
                return (
                  <MenuItem key={key} value={parivalue.Pair}>
                    {' '}
                    {parivalue.Pair}
                  </MenuItem>
                )
              })}
              {/* <MenuItem value="NXV/USDT">NXV/USDT</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2} sm={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
            <Select
              className={classes.select}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={order_status}
              label="field"
              onChange={handleOrderStatus}
            >
              <MenuItem value="0">All</MenuItem>
              <MenuItem value="1">Ordered</MenuItem>
              <MenuItem value="2">Finished</MenuItem>
              <MenuItem value="3">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2} sm={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.searchButton_t}
            endIcon={<SearchIcon />}
          >
            SEARCH
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
