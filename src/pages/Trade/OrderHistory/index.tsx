import React from 'react'
import { Divider, Grid } from '@material-ui/core'
// customized components
import Table from '../components/Table'

import { useAppSelector } from '../../../store/hooks'

// -------import actions----------

// ----------import selectors----------
import { selectOrderhistorylist, selectOrderhistoryTotalCnt } from '../../../store/Trade/OrderHistory/selectors'

interface Column {
  id: 'type' | 'side' | 'amount' | 'filled' | 'created_at' | 'finished_at' | 'pair' | 'price' | 'userid' | 'status'
  label: string
  minWidth?: number
  align?: 'right'
}

const columns: Column[] = [
  { id: 'userid', label: 'User_id', minWidth: 100 },
  { id: 'pair', label: 'Pair', minWidth: 150 },
  { id: 'price', label: 'Price', minWidth: 150 },
  { id: 'amount', label: 'Amount', minWidth: 100 },
  { id: 'filled', label: 'Filled', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'side', label: 'Side', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 150 },
  { id: 'created_at', label: 'Created_at', minWidth: 170 },
  { id: 'finished_at', label: 'Finished_at', minWidth: 180 },
]

export function OrderHistory() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(Number(event.target.value))
    setPage(0) //review entire page form start no
  } //set 10,25,50,100.. left select

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  // React.useEffect(() => {
  //   const formData = new FormData()
  //   formData.append('user_id', '2')
  //   formData.append('order_side', '')
  //   formData.append('pair', '')
  //   formData.append('order_status', '')
  //   formData.append('start_date', '')
  //   formData.append('end_date', '')

  //   dispatch(getOrderHistoryFilter(formData))
  // }, [dispatch])

  // ----database logic----
  const rows = useAppSelector(selectOrderhistorylist)
  const rowsCnt = useAppSelector(selectOrderhistoryTotalCnt)

  const tabNum = 2

  return (
    <div style={{ marginTop: 12 }}>
      <Grid item xs={12}>
        <h2>Order History</h2>
        <Divider />
      </Grid>
      <Table
        // tableInfo={() => TableInfo(rowsCnt, rowsPerPage)}
        rowsPerPage={rowsPerPage} //10,25,50..
        rowsCnt={rowsCnt} //105 datas
        page={page} //first page or second page...
        rows={rows}
        columns={columns}
        handleChange={handleChange}
        handleChangePage={handleChangePage}
        tabNum={tabNum}
      />
    </div>
  )
}
