import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
// @material-ui/core
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
//external
import Button from '../../../components/CustomButtons/Button'
import { REQUEST_API_URL } from '../../../config/config'
import { useAppDispatch } from '../../../store/hooks'
import { getSettingData } from '../../../store/Setting/action'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function SettingModal({ ...props }: any) {
  const { open, settingRes, setIsOpen } = props

  const dispatch = useAppDispatch()
  const [setting, setSetting] = React.useState(settingRes.Data)
  const [alert, setAlert] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertText, setAlertText] = useState('')

  const { register, setValue } = useForm<any>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    let settingFormData = new FormData()
    settingFormData.append('fee', `${setting.Fee}`)
    settingFormData.append('mnemonic', setting.Mnemonic)
    settingFormData.append('hmindex', setting.HMindex)
    settingFormData.append('hotmnemonic', setting.HotMnemonic)
    settingFormData.append('icomnemonic', setting.ICOMnemonic)
    settingFormData.append('withdraw', `${setting.Withdraw}`)
    settingFormData.append('withdrawfee', `${setting.WithdrawFee}`)
    var res

    try {
      var jwtToken = localStorage.getItem('jwtToken')
      res = await axios.post(`${REQUEST_API_URL}/admin/settings/init`, settingFormData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      handleClose()
      dispatch(getSettingData())
      setOpenAlert(true)
      setAlert(res.data.Success)
      for (const property in res.data.Error) {
        if (res.data.Error[property] !== '') {
          setAlertText(res.data.Error[property])
        }
      }
    } catch (err) {
      handleClose()
      setOpenAlert(true)
      setAlert(false)
      setAlertText('There are some erros on the server')
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setSetting(settingRes.Data)
  }

  const handleCloseAlert = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  //-----------------------------------------------------------------
  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Setting Management</DialogTitle>
          <DialogContent>
            <DialogContentText>Please Input the coin pair information.</DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="Fee"
              label="Fee"
              type="input"
              fullWidth
              {...register('Fee', {
                required: true,
              })}
              value={setting?.Fee}
              onChange={(e) =>
                setSetting((prev: any) => {
                  setValue('Fee', e.target.value, { shouldValidate: true })
                  return {
                    ...prev,
                    Fee: e.target.value,
                  }
                })
              }
            />

            <TextField
              autoFocus
              margin="dense"
              id="Mnemonic"
              label="Mnemonic"
              type="input"
              fullWidth
              {...register('Mnemonic', {
                required: true,
              })}
              value={setting?.Mnemonic}
              onChange={(e) =>
                setSetting((prev: any) => {
                  setValue('Mnemonic', e.target.value, { shouldValidate: true })
                  return {
                    ...prev,
                    Mnemonic: e.target.value,
                  }
                })
              }
            />

            <TextField
              autoFocus
              margin="dense"
              id="HotMnemonic"
              label="HotMnemonic"
              type="input"
              fullWidth
              {...register('HotMnemonic', {
                required: true,
              })}
              value={setting?.HotMnemonic}
              onChange={(e) =>
                setSetting((prev: any) => {
                  setValue('HotMnemonic', e.target.value, { shouldValidate: true })
                  return {
                    ...prev,
                    HotMnemonic: e.target.value,
                  }
                })
              }
            />

            <TextField
              autoFocus
              margin="dense"
              id="HMindex"
              label="HMindex"
              type="input"
              fullWidth
              {...register('HMindex', {
                required: true,
              })}
              value={setting?.HMindex}
              onChange={(e) =>
                setSetting((prev: any) => {
                  setValue('HMindex', e.target.value, { shouldValidate: true })
                  return {
                    ...prev,
                    HMindex: e.target.value,
                  }
                })
              }
            />

            <TextField
              autoFocus
              margin="dense"
              id="ICOMnemonic"
              label="ICOMnemonic"
              type="input"
              fullWidth
              {...register('ICOMnemonic', {
                required: true,
              })}
              value={setting?.ICOMnemonic}
              onChange={(e) =>
                setSetting((prev: any) => {
                  setValue('ICOMnemonic', e.target.value, { shouldValidate: true })
                  return {
                    ...prev,
                    ICOMnemonic: e.target.value,
                  }
                })
              }
            />

            <TextField
              autoFocus
              margin="dense"
              id="Withdraw"
              label="Withdraw"
              type="input"
              fullWidth
              {...register('Withdraw', {
                required: true,
              })}
              value={setting?.Withdraw}
              onChange={(e) =>
                setSetting((prev: any) => {
                  setValue('Withdraw', e.target.value, { shouldValidate: true })
                  return {
                    ...prev,
                    Withdraw: e.target.value,
                  }
                })
              }
            />

            <TextField
              autoFocus
              margin="dense"
              id="WithdrawFee"
              label="WithdrawFee"
              type="input"
              fullWidth
              {...register('WithdrawFee', {
                required: true,
              })}
              value={setting?.WithdrawFee}
              onChange={(e) =>
                setSetting((prev: any) => {
                  setValue('WithdrawFee', e.target.value, { shouldValidate: true })
                  return {
                    ...prev,
                    WithdrawFee: e.target.value,
                  }
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" type="submit">
              Ok
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {alert === undefined ? (
        ''
      ) : (
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handleCloseAlert}
          open={openAlert}
          autoHideDuration={3000}
        >
          <Alert
            style={alert === false ? { background: '#bf2d29' } : { background: '#0ECB81' }}
            severity={alert === true ? 'success' : 'error'}
          >
            {alert === true ? 'Success' : alertText}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}
export default SettingModal
