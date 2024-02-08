import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

// customized components
import dateFormat from 'dateformat'
import SearchIcon from '@material-ui/icons/Search'
import { TextField, Grid, Button } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    searchButton: {
      backgroundColor: '#3498db',
    },
    // searchInput: {
    //   width: '100%',
    // },
    starttextField: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      width: '100%',
      textAlign: 'center',
    },
    endtextField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(0),
      width: '100%',
      textAlign: 'center',
    },
  }),
)

interface TableSearchProps {
  handleSearchProps: (start_date: number, end_date: number, keyword: string) => void
}

export default function TableSearch(props: TableSearchProps) {
  const classes = useStyles()
  const { handleSearchProps } = props

  //----------search input logic
  const [keyword, setSearchInput] = React.useState('')
  const handleInputSearchText = (e: any) => {
    setSearchInput(e.target.value)
  }
  // --------Date changes----------
  const [start_date, setStartDate] = React.useState(0)
  const handleStartDate = (e: any) => {
    const startTimestamp = Date.parse(dateFormat(e)) / 1000
    setStartDate(startTimestamp)
  }
  // ------
  const [end_date, setEndDate] = React.useState(0)
  const handleEndDate = (e: any) => {
    const endTimestamp = Date.parse(dateFormat(e)) / 1000
    setEndDate(endTimestamp)
  }
  //----------------dispatch logic-----------
  const handleSearch = (e: any) => {
    e.preventDefault()
    handleSearchProps(start_date, end_date, keyword)
  }

  return (
    <form onSubmit={(e) => handleSearch(e)} className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} sm={6}>
          <TextField
            id="datetime-local"
            type="date"
            variant="outlined"
            label="StartDate"
            size="small"
            className={classes.starttextField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              handleStartDate(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <TextField
            id="datetime-local"
            type="date"
            variant="outlined"
            label="EndDate"
            size="small"
            className={classes.endtextField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              handleEndDate(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12} container>
          <TextField
            id="standard-basic"
            variant="outlined"
            placeholder="Search"
            size="small"
            // className={classes.searchInput}
            onChange={(e) => handleInputSearchText(e)}
          />
           <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.searchButton}
            endIcon={<SearchIcon />}
          >
          </Button>
        </Grid>
        {/* <Grid item xs={12} md={3} sm={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.searchButton}
            endIcon={<SearchIcon />}
          >
          </Button>
        </Grid> */}
      </Grid>
    </form>
  )
}
