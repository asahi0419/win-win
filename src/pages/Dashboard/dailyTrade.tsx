import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import useStyles from './styles'

export default function DailyTrade(props: any) {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div>
      <Paper className={classes.cdephis} variant="outlined">
        <span style={{ fontSize: '20px' }}>24h Trades</span>

        <TableContainer style={{ marginTop: '20px', height: '300px' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className={classes.thead}>
                <TableCell align="center" className={classes.thtitle}>
                  Symbol
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            {props.tTrade ? (
              <TableBody>
                {props.tTrade &&
                  props.tTrade.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, key: any) => (
                    <TableRow key={key} hover>
                      <TableCell align="center" className={classes.tbody}>
                        {row.Symbol}
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        {row.Balance}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell className={classes.nodata} align="center" colSpan={12}>
                    There is no crypto deposit data
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.tTrade?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
