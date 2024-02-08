import React, { useEffect, useState } from 'react'

import { Box, Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import Table from './components/Table'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectCoinPairList, selectResponse } from '../../store/Setting/selectors'
import { getCoinPairList } from '../../store/Setting/action'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function CoinPair() {
  const dispatch = useAppDispatch()
  const response = useAppSelector(selectResponse)

  const columns = ['No', 'Pair', 'Option']

  useEffect(() => {
    dispatch(getCoinPairList())
  }, [dispatch])

  const [notification, setNotification] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationText, setNotificationText] = useState('')
  console.log(typeof response)

  const isEmptyObject = (obj: any) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false
    }
    return true
  }

  useEffect(() => {
    if (!isEmptyObject(response)) {
      setNotification(response.Success)
      setNotificationText(response.Success === true ? 'Success' : response.Error?.Msg)
      setOpenNotification(true)
    }
  }, [response])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const coinPairList = useAppSelector(selectCoinPairList)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(Number(event.target.value))
    setPage(0)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleCloseNotification = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenNotification(false)
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleCloseNotification}
        open={openNotification}
        autoHideDuration={3000}
      >
        <Alert
          style={notification === false ? { background: '#bf2d29' } : { background: '#0ECB81' }}
          severity={notification === true ? 'success' : 'error'}
        >
          {notificationText}
        </Alert>
      </Snackbar>
      <h2>Coin Pair</h2>
      <Box mt={3}>
        <Table
          rowsPerPage={rowsPerPage}
          rowsCnt={coinPairList.length}
          page={page}
          rows={coinPairList}
          columns={columns}
          handleChange={handleChange}
          handleChangePage={handleChangePage}
        />
      </Box>
    </>
  )
}

export default CoinPair
