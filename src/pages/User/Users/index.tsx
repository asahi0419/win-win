import React, { useState } from 'react'
import UserTable from './UserTable'
import UserForm from './UserForm'
import { useAppSelector } from 'store/hooks'
import { selectUserList } from 'store/User/Users/selectors'

export default function Users(props: any) {
  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState(0)
  const [status, setStatus] = useState(false)
  const userDetail = useAppSelector(selectUserList)

  const handleClose = () => {
    setOpen(false)
    setCurrentId(0)
    setStatus(!status)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <div>
      <UserForm
        open={open}
        handleClose={handleClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
        userDetail={userDetail}
      />
      <UserTable
        handleClickOpen={() => handleOpen()}
        setCurrentId={setCurrentId}
        userDetail={userDetail}
        status={status}
      />
    </div>
  )
}
