import React from 'react'
import { useForm } from 'react-hook-form'
// @material-ui/core
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
// customized components
import Button from '../../../components/CustomButtons/Button'
// hook & actions
import { useAppDispatch } from '../../../store/hooks'
import { addCoinPair } from '../../../store/Setting/action'
import { CoinPairType } from '../../../types/Setting'

function CoinPairEditModal({ ...props }: any) {
  const { open, handleClose, currentId, setCurrentId } = props

  const dispatch = useAppDispatch()

  const initialState = {
    Pair: '',
    Price: 0,
  }

  const [pairData, setPairData] = React.useState<CoinPairType>(initialState)

  const clearData = () => {
    setPairData(initialState)
    setCurrentId(0)
  }

  const { register, setValue } = useForm<any>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (currentId === 0) {
      let pairFormData = new FormData()
      pairFormData.append('pair', `${pairData.Pair}`)
      dispatch(addCoinPair(pairFormData))
    }
    handleClose()
    clearData()
  }

  //-----------------------------------------------------------------
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">
          Coin Pair Management {` >> ${currentId === 0 ? 'Add' : 'Update'} Coin Pair`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Please Input the coin pair information.</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="Pair"
            label="Pair"
            type="input"
            fullWidth
            {...register('Pair', {
              required: true,
            })}
            value={pairData.Pair}
            onChange={(e) =>
              setPairData((prev) => {
                setValue('Pair', e.target.value, { shouldValidate: true })
                return {
                  ...prev,
                  Pair: e.target.value,
                }
              })
            }
          />
          <TextField
            margin="dense"
            id="Price"
            label="Price"
            type="input"
            fullWidth
            disabled
            {...register('Price', {
              required: true,
            })}
            value={pairData.Price}
            onChange={(e) =>
              setPairData((prev) => {
                setValue('Price', parseFloat(e.target.value), { shouldValidate: true })
                return {
                  ...prev,
                  Price: parseFloat(e.target.value),
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
  )
}
export default CoinPairEditModal
