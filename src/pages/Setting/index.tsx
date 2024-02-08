import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'

import Table from './components/Table'

import { useAppDispatch } from '../../store/hooks'
import { getSettingData } from '../../store/Setting'

function Notification() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getSettingData())
  }, [dispatch])

  return (
    <>
      <h2>Setting</h2>
      <Box mt={3}>
        <Table />
      </Box>
    </>
  )
}

export default Notification
