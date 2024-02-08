import React from 'react'
import Paper from '@material-ui/core/Paper'
import SearchBar from 'material-ui-search-bar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectFinancehistoryTotalCnt, selectFinancehistorylist } from '../../store/Finance/selectors'
import { getCryptoHistory } from '../../store/Finance'
import { CryptoType } from '../../config/constants'

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
    formData.append('type', CryptoType.CRYPTO_WITHDRAW)
    formData.append('keyword', sendData)
    formData.append('cur_page', page.toString())
    formData.append('per_page', rowsPerPage.toString())

    dispatch(getCryptoHistory(formData))
  }, [page, rowsPerPage, sendData, dispatch])

  const data = useAppSelector(selectFinancehistorylist)
  const count = useAppSelector(selectFinancehistoryTotalCnt)

  const handleSubmit = () => {
    setSendData(keyword)
  }

  return (
    <div>
      <Paper className={classes.cdephis} variant="outlined">
        <span style={{ fontSize: '20px' }}>Crypto Withdraw</span>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          onRequestSearch={() => handleSubmit()}
          className={classes.search}
          placeholder="TxnHash/Symbol/From/To"
        />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className={classes.thead}>
                <TableCell align="center" className={classes.thtitle}>
                  Txn Hash
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  Symbol
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  From
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  To
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  Amount
                </TableCell>
                <TableCell align="center" className={classes.thtitle}>
                  UserID
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
                      <TableCell align="center" className={classes.tbody}>
                        <div className={classes.tbOverflow}>{row.TxHash}</div>
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        {row.Symbol}
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        <div className={classes.tbOverflow}>{row.From}</div>
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        <div className={classes.tbOverflow}>{row.To}</div>
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        {row.FloatValue}
                      </TableCell>
                      <TableCell align="center" className={classes.tbody}>
                        {row.UserID}
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
                    There is no crypto withdraw data
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
