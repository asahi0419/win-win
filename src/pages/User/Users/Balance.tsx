import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectUserList } from 'store/User/Users/selectors'
import { updateUser } from 'store/User/Users'

export default function Balance(id: any) {
  const userDetail = useAppSelector(selectUserList)
  const [balances, setBalances] = useState([])
  const dispatch = useAppDispatch()
  const confirm = id.updateConfirm
  useEffect(() => {
    userDetail.map((list: any) => {
      if (list.Id === id.id) {
        list.Balance && setBalances(list.Balance)
        return 0
      }
      return 0
    })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm])
  const handleUpdate = (updateData: any) => {
    const formData = new FormData()
    formData.append('user_id', id.id.toString())
    formData.append('symbol', updateData.ChainName)
    formData.append('amount', updateData.Amount)

    dispatch(updateUser(formData))
  }

  const editable = balances.map((o) => JSON.parse(JSON.stringify(o)))

  return (
    <div>
      <MaterialTable
        title="Balance"
        columns={[
          { title: 'Symbol', field: 'ChainName' },
          { title: 'Amount', field: 'Amount' },
        ]}
        data={editable}
        options={{
          paging: false,
        }}
        editable={{
          onRowUpdate: (newData: any) =>
            new Promise((resolve: any) => {
              handleUpdate(newData)

              setTimeout(() => {
                resolve()
              }, 1000)
            }),
          onRowAdd: (newData: any) =>
            new Promise((resolve: any) => {
              setTimeout(() => {
                handleUpdate(newData)

                resolve()
              }, 1000)
            }),
        }}
        style={{ padding: '25px' }}
      />
    </div>
  )
}
