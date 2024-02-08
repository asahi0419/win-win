import React from 'react'
//material-ui components
import { TableBody, TableRow, Paper, Table, Box, TableContainer, TableHead } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
//style
import {
  StyledTableCell,
  StyledTableHead,
  StyledTableControlBox,
  StyledTablePagination,
  StyledRowsPerPageBox,
  StyledNativeSelect,
  BootstrapInput,
  useStyles,
} from '../Style_table'
import TablePaginationActions from './Pagination'
import { TradehistorySearchbar } from './TradehistorySearchbar'
import { OrderhistorySearchbar } from './OrderhistorySearchbar'
import { dateConvert } from '../../../common/utils'

function CustomizedTable({ ...props }: any) {
  const { columns, rows, rowsPerPage, page, rowsCnt, handleChange, handleChangePage, tabNum } = props
  const classes = useStyles()

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    handleChangePage(event, newPage)
  }

  const onSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    handleChange(event)
  }
  // const tabNumber = tabNum

  return (
    <Paper elevation={3} className={classes.root}>
      <StyledTableControlBox mb="20px" style={{ padding: '20px 20px' }}>
        {/* <Box>{tableInfo}</Box> */}
        {tabNum === 1 ? (
          <TradehistorySearchbar rowsPerPage={rowsPerPage} curPage={page} />
        ) : (
          <OrderhistorySearchbar rowsPerPage={rowsPerPage} curPage={page} />
        )}
      </StyledTableControlBox>
      {/* style={{ textalign: 'center' }} */}
      <TableContainer component={Paper} style={{ boxShadow: 'none', color: 'red' }}>
        <Table stickyHeader>
          <StyledTableHead>
            <TableRow>
              {columns.map((column: any, key: any) => {
                return (
                  <StyledTableCell
                    key={key}
                    style={{ minWidth: column.minWidth, textAlign: 'center' }}
                    align={column.align}
                  >
                    {column.label}
                  </StyledTableCell>
                )
              })}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows?.map((row: any, key: any) => (
              <TableRow key={key}>
                {columns.map((column: any) => {
                  if (column.id === 'Cancel_action') {
                    return (
                      <StyledTableCell style={{ textAlign: 'center' }} key={column.id}>
                        <button className={classes.btn}> Cancel </button>
                      </StyledTableCell>
                    )
                  } else if (column.id === 'side') {
                    return (
                      <StyledTableCell style={{ textAlign: 'center' }} key={column.id}>
                        {row[column.id] === 0 ? 'Buy' : 'Sell'}
                      </StyledTableCell>
                    )
                  } else if (column.id === 'Side') {
                    return (
                      <StyledTableCell style={{ textAlign: 'center' }} key={column.id}>
                        {row[column.id] === 0 ? 'Buy' : 'Sell'}
                      </StyledTableCell>
                    )
                  } else if (column.id === 'status') {
                    return (
                      <StyledTableCell style={{ textAlign: 'center' }} key={column.id}>
                        {row[column.id] === 0
                          ? 'All'
                          : row[column.id] === 1
                          ? 'Ordered'
                          : row[column.id] === 2
                          ? 'Finished'
                          : 'Cancelled'}
                      </StyledTableCell>
                    )
                  } else if (column.id === 'created_at') {
                    return (
                      <StyledTableCell style={{ textAlign: 'center' }} key={column.id}>
                        {dateConvert(row[column.id])}
                      </StyledTableCell>
                    )
                  } else if (column.id === 'finished_at') {
                    return (
                      <StyledTableCell style={{ textAlign: 'center' }} key={column.id}>
                        {dateConvert(row[column.id])}
                      </StyledTableCell>
                    )
                  } else if (column.id === 'Timestamp') {
                    return (
                      <StyledTableCell style={{ textAlign: 'center' }} key={column.id}>
                        {dateConvert(row[column.id])}
                      </StyledTableCell>
                    )
                  } else {
                    return (
                      <StyledTableCell style={{ textAlign: 'center' }} key={column.id}>
                        {row[column.id]}
                      </StyledTableCell>
                    )
                  }
                })}
              </TableRow>
            ))}

            {rowsCnt === 0 && (
              <TableRow>
                <StyledTableCell style={{ padding: '10px' }} colSpan={12}>
                  <Alert severity="error" className={classes.alertContent}>
                    There is no data
                  </Alert>
                </StyledTableCell>
              </TableRow>
            )}
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
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
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
                  //here! rowsCnt -> TotalCnt
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
  )
}

export default CustomizedTable
