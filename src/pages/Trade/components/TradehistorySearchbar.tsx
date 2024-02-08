import React from 'react'
import axios from 'axios'
import dateFormat from 'dateformat'
import { Grid, Button, Divider } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { REQUEST_API_URL } from 'config/config'
import { useStyles } from '../Style_searchbar'

// hook & actions
import { useAppDispatch } from '../../../store/hooks'
import { getTradeHistoryFilter } from '../../../store/Trade/TradeHistory'

export function TradehistorySearchbar({ ...props }: any) {
  const per_page = props.rowsPerPage
  const cur_page = props.curPage
  const [pairvalues, setPairValues] = React.useState([])

  React.useEffect(() => {
    axios.post(`${REQUEST_API_URL}/coinpair/list`).then((res) => {
      setPairValues(res.data.Data)
    })
  }, [])

  const classes = useStyles()
  const dispatch = useAppDispatch()

  // -----Pair select onchanges-----
  const [pair, setPair] = React.useState('')
  const pairChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPair(event.target.value as string)
  }

  // ---------User_Id field-------
  const [user_id, setUserId] = React.useState('')
  const handleUserId = (e: any) => {
    setUserId(e.target.value)
  }

  // ---------add daterangepicker-------
  // const toggle = () => setOpenCalendar(!openCalendar)
  // const [openCalendar, setOpenCalendar] = React.useState(false)
  // const [dateRange, setDateRange] = React.useState<DateRange>({})
  // const [startTime, setStartTime] = React.useState('')
  // const [endTime, setEndTime] = React.useState('')

  // const handleDateSelect = (e: any) => {
  //   setDateRange(e)
  //   setOpenCalendar(!openCalendar)
  //   setStartTime(dateConvert(Date.parse(dateFormat(dateRange.startDate)) / 1000))
  //   setEndTime(dateConvert(Date.parse(dateFormat(dateRange.endDate)) / 1000))
  // }
  // const startTimestamp = Date.parse(dateFormat(dateRange.startDate)) / 1000
  // const endTimestamp = Date.parse(dateFormat(dateRange.endDate)) / 1000
  // console.log('startTimestamp test', startTimestamp)
  // console.log('startTime test', startTime)

  // -------set starttime & end time----------
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
    formData.append('pair', pair)
    formData.append('start_date', start_date.toString())
    formData.append('end_date', end_date.toString())
    dispatch(getTradeHistoryFilter(formData))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const formData = new FormData()
    formData.append('cur_page', cur_page)
    formData.append('per_page', per_page)
    dispatch(getTradeHistoryFilter(formData))
  }, [dispatch, cur_page, per_page])

  // ---------Fucntion-----
  const Searchfun_tradehistory = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('cur_page', cur_page)
    formData.append('per_page', per_page)
    formData.append('user_id', user_id)
    formData.append('pair', pair)
    formData.append('start_date', start_date.toString())
    formData.append('end_date', end_date.toString())
    dispatch(getTradeHistoryFilter(formData))
    setUserId('')
    setPair('')
    setStartDate(0)
    setEndDate(0)
  }

  return (
    <form onSubmit={(e) => Searchfun_tradehistory(e)}>
      <Grid spacing={3} container className={classes.searchDiv}>
        <Grid item xs={12} md={5} sm={6}>
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
        <Grid item xs={12} md={5} sm={6}>
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
        {/* <Grid item className={classes.flexPosition}>
          <Typography variant="body2" className={classes.hisTimetxt}>
            From
          </Typography>
          <input
            placeholder="YYYY-MM-DD"
            onClick={toggle}
            value={startTime.split(' ')[0]}
            readOnly
            className={classes.input}
          />
          <Typography variant="body2" className={classes.hisTimetxt}>
            To
          </Typography>
          <input
            placeholder="YYYY-MM-DD"
            onClick={toggle}
            value={endTime.split(' ')[0]}
            readOnly
            className={classes.input}
          />
          <div className={classes.calendar}>
            <DateRangePicker open={openCalendar} toggle={toggle} onChange={(range) => handleDateSelect(range)} />
          </div>
        </Grid> */}
      </Grid>
      <Divider style={{ marginTop: '25px', marginBottom: '20px' }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} sm={6}>
          <div className={classes.userField}>
            <TextField
              id="outlined-basic"
              label="User_ID"
              variant="outlined"
              size="small"
              value={user_id}
              type="number"
              onChange={handleUserId}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Pair</InputLabel>
            <Select
              className={classes.select}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={pair}
              label="field"
              onChange={pairChange}
            >
              {pairvalues.map((parivalue: any, key: any) => {
                return (
                  <MenuItem key={key} value={parivalue.Pair}>
                    {parivalue.Pair}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
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
