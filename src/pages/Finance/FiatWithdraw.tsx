import React from 'react'
import Paper from '@material-ui/core/Paper'
import SearchBar from 'material-ui-search-bar'
import Table from '@material-ui/core/Table'
import Chip from '@material-ui/core/Chip'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectFinancehistoryTotalCnt, selectFinancehistorylist } from '../../store/Finance/selectors'
import { getFiatHistory } from '../../store/Finance'
import { FiatType } from '../../config/constants'

import useStyles from './styles'

export default function FiatDeposit(props: any) {
  const classes = useStyles()
  const [searched, setSearched] = React.useState<string>('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [keyword, setKeyword] = React.useState('')
  const [sendData, setSendData] = React.useState('')
  const dispatch = useAppDispatch()

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

  React.useEffect(() => {
    const formData = new FormData()
    formData.append('type', FiatType.FIAT_WITHDRAW)
    formData.append('keyword', sendData)
    formData.append('cur_page', page.toString())
    formData.append('per_page', rowsPerPage.toString())

    dispatch(getFiatHistory(formData))
  }, [sendData, page, rowsPerPage, dispatch])

  const data = useAppSelector(selectFinancehistorylist)
  const count = useAppSelector(selectFinancehistoryTotalCnt)

  const handleSearch = () => {
    setSendData(keyword)
  }

  return (
    <div>
      <Paper className={classes.cdephis} variant="outlined">
        <span style={{ fontSize: '20px' }}>Fiat Withdraw</span>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          onRequestSearch={() => handleSearch()}
          className={classes.search}
          placeholder="BatchID/TxnID/Status"
        />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className={classes.thead}>
                <TableCell align="center" className={classes.thtitle}>
                  BatchID
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  TxnID
                </TableCell>{' '}
                <TableCell align="center" className={classes.thtitle}>
                  Payer
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  Amount
                </TableCell>{' '}
                <TableCell align="center" className={classes.thtitle}>
                  Unit
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  Confirmed
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  Fee
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  Status
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            {data ? (
              <TableBody>
                {data &&
                  data.map((row: any, key: any) => (
                    <TableRow key={key} hover>
                      <TableCell className={classes.tbody}>{row.BatchId}</TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        <div className={classes.tbOverflow}>{row.TransactionId}</div>
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        <div className={classes.tbOverflow}>{row.Payer}</div>
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        {row.Amount}
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        <div className={classes.tbOverflow}>{row.CurrencyCode}</div>
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        <div className={classes.tbOverflow}>{row.NetAmount}</div>
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        {row.Fee}
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        {row.Status === 'SUCCESS' ? (
                          <Chip
                            size="small"
                            label="Success"
                            component="a"
                            style={{
                              backgroundColor: '#61309b',
                              fontSize: '12px',
                              color: '#fff',
                              width: '82px',
                            }}
                            clickable
                          />
                        ) : row.Status === 'PROCESSING' ? (
                          <Chip
                            size="small"
                            label="Processing"
                            component="a"
                            style={{
                              backgroundColor: '#1d4099',
                              color: '#fff',
                              fontSize: '12px',
                              width: '82px',
                            }}
                            clickable
                          />
                        ) : row.Status === 'PENDING' ? (
                          <Chip
                            size="small"
                            label="Pending"
                            component="a"
                            style={{
                              backgroundColor: '#c5ae28',
                              color: '#fff',
                              fontSize: '12px',
                              width: '82px',
                            }}
                            clickable
                          />
                        ) : row.Status === 'COMPLETED' ? (
                          <Chip
                            size="small"
                            label="Completed"
                            component="a"
                            style={{
                              backgroundColor: '#4aab1f',
                              color: '#fff',
                              fontSize: '12px',
                              width: '82px',
                            }}
                            clickable
                          />
                        ) : (
                          <Chip
                            size="small"
                            label="Failed"
                            component="a"
                            style={{
                              backgroundColor: '#c13948',
                              color: '#fff',
                              fontSize: '12px',
                              width: '82px',
                            }}
                            clickable
                          />
                        )}
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        {new Date(row.Timestamp * 1000).toLocaleString('en-GB')}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell className={classes.nodata} align="center" colSpan={12}>
                    There is no fiat withdraw data
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
    </div>
  )
}
