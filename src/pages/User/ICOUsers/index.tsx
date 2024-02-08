import React, { useCallback, useEffect, useState } from 'react'

import Card from 'components/Card/Card'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ICOUserTable from './ICOUserTable'

import { GetDepositBalance, GetZNXBalance } from 'hooks/crowdsale'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectICOUserList } from 'store/User/ICOUsers/selectors'
import { showAlert } from 'store/alert'

import useStyles from './style'

export default function ICOUsers(props: any) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const icoUserDetail = useAppSelector(selectICOUserList)

  const [ethBalance, setETHBalance] = useState(0)
  const [bnbBalance, setBNBBalance] = useState(0)
  const [znxBalance, setZNXBalance] = useState(0)

  const getETHBalance = useCallback(() => {
    var formData = new FormData()
    formData.append('symbol', 'ETH')

    GetDepositBalance(formData).then((res: any) => {
      if (res === undefined) {
        dispatch(showAlert({ message: 'Network connection error', severity: 'error' }))
        return
      }
      if (res.data.Success) {
        setETHBalance(res.data.Balance)
      } else {
        dispatch(showAlert({ message: res?.data?.Error?.Msg, severity: 'error' }))
      }
    })
  }, [dispatch])

  const getBNBBalance = useCallback(() => {
    var formData = new FormData()
    formData.append('symbol', 'BNB')

    GetDepositBalance(formData).then((res: any) => {
      if (res === undefined) {
        dispatch(showAlert({ message: 'Network connection error', severity: 'error' }))
        return
      }
      if (res.data.Success) {
        setBNBBalance(res.data.Balance)
      } else {
        dispatch(showAlert({ message: res?.data?.Error?.Msg, severity: 'error' }))
      }
    })
  }, [dispatch])

  const getZNXBalance = useCallback(() => {
    var formData = new FormData()

    GetZNXBalance(formData).then((res: any) => {
      if (res === undefined) {
        dispatch(showAlert({ message: 'Network connection error', severity: 'error' }))
        return
      }
      if (res.data.Success) {
        setZNXBalance(res.data.Balance)
      } else {
        dispatch(showAlert({ message: res?.data?.Error?.Msg, severity: 'error' }))
      }
    })
  }, [dispatch])

  useEffect(() => {
    getETHBalance()
    getBNBBalance()
    getZNXBalance()
  }, [getETHBalance, getBNBBalance, getZNXBalance])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={4} md={4}>
          <Card>
            <div style={{ padding: '15px', justifyContent: 'center' }}>
              <div className={classes.coin_img}>
                <img src="/assets/eth.png" alt="user" width={50} />
                <span className={classes.text}>Total ETH</span>
              </div>
              <div>
                <span className={classes.coin_balance}>{ethBalance} </span>
              </div>
            </div>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <Card>
            <div style={{ padding: '15px', justifyContent: 'center' }}>
              <div className={classes.coin_img}>
                <img src="/assets/bnb.png" alt="user" width={50} />
                <span className={classes.text}>Total BNB</span>
              </div>
              <div>
                <span className={classes.coin_balance}>{bnbBalance} </span>
              </div>
            </div>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <Card>
            <div style={{ padding: '15px', justifyContent: 'center' }}>
              <div className={classes.coin_img}>
                <img src="/assets/znx.png" alt="user" width={50} />
                <span className={classes.text}>Total ZNX</span>
              </div>
              <div>
                <span className={classes.coin_balance}>{znxBalance} </span>
              </div>
            </div>
          </Card>
        </GridItem>
      </GridContainer>
      <ICOUserTable userDetail={icoUserDetail} />
    </div>
  )
}
