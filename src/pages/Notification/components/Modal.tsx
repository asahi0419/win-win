import React from 'react'
// @material-ui/core
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

// customized components
import Button from '../../../components/CustomButtons/Button'

function Modal({ ...props }: any) {
  const { modalopen, handleClose, updateId, msg } = props
  const [message, setMessage] = React.useState('')
  const handleChange = (e: any) => {
    setMessage(e)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('notification_id', updateId)
    formData.append('message', message)
  }

  //-----------------------------------------------------------------
  return (
    <Dialog open={modalopen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="Username"
            type="input"
            fullWidth
            value={msg.msg}
            onChange={(e) => handleChange(e.target.value)}
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
export default Modal
