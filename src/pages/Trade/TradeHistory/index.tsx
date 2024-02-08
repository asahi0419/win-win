import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import Table from '../components/Table'

import { useAppSelector } from '../../../store/hooks'

// ---------import actions-------

// ----------import selectors------------
import { selectTradehistorylist, selectTradehistoryTotalCnt } from '../../../store/Trade/TradeHistory/selectors'

interface Column {
  id: 'OrderId' | 'UserId' | 'Pair' | 'Side' | 'Price' | 'Excuted' | 'Fee' | 'Timestamp'
  label: string
  minWidth?: number
  align?: 'right'
}

const columns: Column[] = [
  { id: 'OrderId', label: 'OrderId', minWidth: 100 },
  { id: 'UserId', label: 'UserId', minWidth: 100 },
  { id: 'Pair', label: 'Pair', minWidth: 100 },
  { id: 'Side', label: 'Side', minWidth: 100 },
  { id: 'Price', label: 'Price', minWidth: 100 },
  { id: 'Excuted', label: 'Excuted', minWidth: 170 },
  { id: 'Fee', label: 'Fee', minWidth: 180 },
  { id: 'Timestamp', label: 'Timestamp', minWidth: 150 },
]

export function TradeHistory() {
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [page, setPage] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(Number(event.target.value))
    setPage(0)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  // ----database logic----useAppSelector() is only get
  const rows = useAppSelector(selectTradehistorylist)
  const TotalCnt = useAppSelector(selectTradehistoryTotalCnt)

  const tabNum = 1

  return (
    <div style={{ marginTop: 12 }}>
      <Grid item xs={12}>
        <h2>Tade History</h2>
        <Divider />
      </Grid>
      <Table
        rowsPerPage={rowsPerPage}
        page={page} //current page
        rows={rows}
        rowsCnt={TotalCnt}
        columns={columns}
        tabNum={tabNum}
        handleChange={handleChange}
        handleChangePage={handleChangePage}
      />
    </div>
  )
}
