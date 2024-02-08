import React, { useEffect, useState } from 'react'
import ChartistGraph from 'react-chartist'

import { Divider } from '@material-ui/core'

import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import TotalBalance from './TotalBalance'
import DailyTrade from './dailyTrade'
import { emailsSubscriptionChart } from './chart-config/charts'

import { dashboardData } from 'store/Dashboard/actions'

export function Dashboard() {
  var data = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]],
  }

  var options = {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc: function (value: any, index: any) {
        return index % 2 === 0 ? value : null
      },
    },
  }

  var type = 'Bar'
  const [userCount, setUserCount] = useState(0)
  const [unMsgCount, setUnMsgCount] = useState(0)
  const [totalBalances, setTotalBalances] = useState([])
  const [totalTrades, setTotalTrades] = useState([])

  useEffect(() => {
    dashboardData().then((res: any) => {
      if (res?.Success) {
        setUserCount(res.UserCount)
        setUnMsgCount(res.MsgCount)
        setTotalBalances(res.TotalBalance)
        setTotalTrades(res.TradeBalance)
      }
    })
  }, [])

  return (
    <div>
      <h2>DashBoard</h2>
      <Divider />
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <div style={{ display: 'flex', padding: '15px' }}>
              <div
                style={{
                  fontSize: '40px',
                  alignSelf: 'center',
                  marginRight: '15px',
                }}
              >
                <img src="/assets/users.png" alt="user" width={100} />
              </div>
              <div>
                <span style={{ fontSize: '40px' }}>{userCount}</span>
                <br />
                <h2>TOTAL USERS</h2>
              </div>
            </div>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <div style={{ display: 'flex', padding: '15px' }}>
              <div
                style={{
                  fontSize: '40px',
                  marginRight: '15px',
                  alignSelf: 'center',
                }}
              >
                <img src="/assets/message.png" alt="user" width={88} />
              </div>
              <div>
                <span style={{ fontSize: '40px' }}>{unMsgCount}</span>
                <br />
                <h2>UNREAD ARTICLES</h2>
              </div>
            </div>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <TotalBalance tBalance={totalBalances} />
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <Card style={{ color: 'black' }}>
            <DailyTrade tTrade={totalTrades} />
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart={true}>
            <CardHeader color="success">
              <h1 style={{ fontSize: '5vm' }}>Sign up history11</h1>
              <ChartistGraph data={data} options={options} type={type} />
            </CardHeader>
            <CardBody>
              <h4>Sign ups(30 dyas)</h4>
            </CardBody>
            <CardFooter chart={true}>
              <div>{/* updated 4 minutes ago */}</div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card chart={true}>
            <CardHeader color="warning">
              <h1>Deposit/Withdraw Chart</h1>
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Line"
                options={emailsSubscriptionChart.options}
              />
            </CardHeader>
            <CardBody>
              <h4>Deposit/Withdraw (30 days)</h4>
            </CardBody>
            <CardFooter chart={true}>
              <div></div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
