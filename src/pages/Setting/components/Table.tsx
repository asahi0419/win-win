import React from 'react'
//material-ui components
import { TableBody, TableRow, Paper, Table, TableContainer, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import ShowIcon from '@material-ui/icons/Visibility'
import HideIcon from '@material-ui/icons/VisibilityOff'

import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch'
import SettingModal from './SettingModal'
import { useAppSelector } from '../../../store/hooks'
import { selectSettingData } from '../../../store/Setting/selectors'
import { StyledTableCell, StyledTableHead, useStyles } from '../Style'
import { WithdrawType } from 'config/constants'

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string
}

interface Props extends SwitchProps {
  classes: Styles
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 37,
      height: 20,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 18,
      height: 18,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: '#F50057',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
})

function SettingTable() {
  const classes = useStyles()
  const columns = [
    'Fee',
    'Mnemonic',
    'HotMnemonic',
    'HMindex',
    'ICOMnemonic',
    'Withdraw',
    'WithdrawFee',
    'Timestamp',
    'Edit',
  ]

  const settingRes: any = useAppSelector(selectSettingData)

  const [open, setOpen] = React.useState(false)
  const [isHide, setIsHide] = React.useState(true)

  const handleVisibleBalance = () => {
    setIsHide(!isHide)
  }

  const handleEditModalOpen = () => {
    setOpen(true)
  }

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen)
  }
  return (
    <>
      <SettingModal open={open} setIsOpen={handleClose} settingRes={settingRes} />
      <Paper elevation={3} className={classes.root}>
        <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
          <Table stickyHeader>
            <StyledTableHead>
              <TableRow>
                {columns.map((column: any, key: any) => {
                  return <StyledTableCell key={key}>{column}</StyledTableCell>
                })}
              </TableRow>
            </StyledTableHead>
            <TableBody>
              <TableRow>
                <StyledTableCell>{settingRes.Data?.Fee}</StyledTableCell>
                <StyledTableCell style={{ width: 160, wordBreak: 'break-word' }}>
                  {isHide ? '********' : settingRes.Data?.Mnemonic}
                </StyledTableCell>
                <StyledTableCell style={{ width: 160, wordBreak: 'break-word' }}>
                  {isHide ? '********' : settingRes.Data?.HotMnemonic}
                </StyledTableCell>
                <StyledTableCell>{settingRes.Data?.HMindex}</StyledTableCell>
                <StyledTableCell style={{ width: 160, wordBreak: 'break-word' }}>
                  {isHide ? '********' : settingRes.Data?.ICOMnemonic}
                </StyledTableCell>
                <StyledTableCell>
                  <IOSSwitch
                    checked={settingRes.Data?.Withdraw === WithdrawType.WITHDRAW_CONFIRMED ? true : false}
                    // onChange={(e) => handleChangePhone(e, row.Id, row.PhoneVerify)}
                    name="checkedWithdraw"
                  />
                  {/* {settingRes.Data?.Withdraw} */}
                </StyledTableCell>
                <StyledTableCell>{settingRes.Data?.WithdrawFee}</StyledTableCell>
                <StyledTableCell>{new Date(settingRes.Data?.Timestamp * 1000).toLocaleString('en-GB')}</StyledTableCell>
                <StyledTableCell>
                  <div style={{ display: 'flex' }}>
                    <IconButton className={classes.editBtn} onClick={handleEditModalOpen}>
                      <EditIcon className={classes.editIcon} />
                    </IconButton>
                    <IconButton className={classes.visibleBalance} onClick={handleVisibleBalance}>
                      {isHide ? (
                        <ShowIcon className={classes.visibleBalanceIcon} />
                      ) : (
                        <HideIcon className={classes.visibleBalanceIcon} />
                      )}
                    </IconButton>
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

export default SettingTable
