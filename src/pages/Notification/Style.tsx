import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, Box, TableCell, TableHead, TablePagination, NativeSelect, InputBase } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '12px',
    wordWrap: 'break-word',
    backgroundColor: 'white',
    boxShadow: '0 0.5rem 1.2rem rgb(189 197 209 / 20%)',
    border: '1px solid #e7eaf3',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  textField: {
    width: '90%',
    heigth: '34px',
  },
  header: {
    padding: '10px 20px',
  },
  bin: {
    cursor: 'pointer',
  },
  fontColor4: {
    color: '#c23b4e',
  },
  fontColor5: {
    color: '#0ecb81',
  },
  btn: {
    color: 'white',
    background: '#3f51b5',
    fontSize: '15px',
    lineHeight: 1.4,
    borderRadius: '4px',
    padding: '9px 15px',
    border: 'none',
    marginLeft: '12px',
  },
  editIcon: {
    width: '16px',
    height: '16px',
    fill: 'white',
  },
  activeIcon: {
    width: '18px',
    height: '18px',
    fill: 'white',
    padding: '3px',
  },
  inactiveIcon: {
    width: '18px',
    height: '18px',
    fill: 'white',
    padding: '3px',
  },
  editBtn: {
    width: '26px',
    height: '26px',
    borderRadius: '4px',
    background: '#4caf50',
    '&:hover': {
      background: '#159115',
    },
  },
  activeBtn: {
    width: '52px',
    height: '26px',
    borderRadius: '4px',
    background: '#4caf50',
    display: 'flex',
    marginLeft: '10px',
  },

  inactiveBtn: {
    width: '52px',
    height: '26px',
    borderRadius: '4px',
    background: '#c72020',
    display: 'flex',
    marginLeft: '10px',
  },
  selectBtn: {
    width: '23px',
    height: '21px',
    marginTop: '2px',
    marginLeft: '3px',
    borderRadius: '4px',
    background: '#fff',
  },
  inselectBtn: {
    width: '23px',
    height: '21px',
    marginTop: '2px',
    marginLeft: '3px',
    borderRadius: '4px',
    background: '#fff',
  },
  RightFloat: {
    textAlign: 'right',
  },
  deleteIcon: {
    width: '16px',
    height: '16px',
    fill: 'white',
  },
  deleteBtn: {
    width: '26px',
    height: '26px',
    borderRadius: '4px',
    background: '#c72020',
    marginLeft: '8px',
    '&:hover': {
      background: '#931e1e',
    },
  },
  contentField: {
    padding: '10px',
    fontSize: '16px',
    lineHeight: '18px',
    resize: 'vertical',
    width: '280px',
    maxHeight: '200px',
  },
  saveBtn: {
    height: '25px',
    fontSize: '14px',
  },
  cancelBtn: {
    height: '25px',
    fontSize: '14px',
    marginLeft: '10px',
  },
  okBtn: {
    borderRadius: '4px',
    border: '1px solid white',
    color: 'white',
    marginTop: '10px',
    marginLeft: '60px',
  },
  cancelBtn1: {
    borderRadius: '4px',
    border: '1px solid white',
    marginLeft: '10px',
    color: 'white',
    marginTop: '10px',
  },
  alertDiv: {
    background: '#2196f3',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
  },
  errorIcon: {
    fill: 'white',
    verticalAlign: 'middle',
    marginRight: '4px',
  },
}))

export const StyledTableHead = withStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.primary.dark,
    backgroundColor: 'transparent',
    color: 'black',
    borderBottom: theme.palette.secondary.light,
  },
}))(TableHead)

export const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '8px 10px',
    backgroundColor: 'transparent',
    borderBottom: '1px solid #e7eaf3',
    color: '#1e2022',
    fontSize: '14px',
  },
  head: {
    padding: '8px 10px',
    color: '#6c757e',
    fontWeight: 600,
    fontSize: '14px',
    backgroundColor: '#f8fafd',
    borderTop: '1px solid #e7eaf3',
    borderBottom: '2px solid #e7eaf3',
  },
}))(TableCell)

export const StyledPaginationBtn = withStyles({
  root: {
    margin: '0 4px',
    padding: '5px 10px',
    backgroundColor: 'rgba(51,122,254,.1)',
    maxHeight: '30px',
    borderColor: '#e7eaf3',
    color: '#3498db',
    fontSize: '12px',
    lineHeight: 1.5,
    textTransform: 'none',
    minWidth: '45px',
    borderRadius: '6px',
    '&:hover': {
      color: 'white',
      backgroundColor: '#3498db',
    },
  },
})(Button)

export const StyledPageInfoBtn = withStyles({
  root: {
    textAlign: 'center',
    margin: '0 4px',
    padding: '5px 10px',
    backgroundColor: 'rgba(51,122,254,.1)',
    maxHeight: '30px',
    borderColor: '#e7eaf3',
    color: '#8c98a4',
    fontSize: '12px',
    lineHeight: 1.5,
    fontWeight: 500,
    textTransform: 'none',
    minWidth: '100px',
    borderRadius: '6px',
  },
})(Box)

export const StyledTableControlBox = withStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down(768)]: {
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
    [theme.breakpoints.up(768)]: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  },
}))(Box)

export const StyledTablePagination = withStyles({
  root: {
    padding: '0px',
    border: 'none',
  },
  input: {
    display: 'none',
  },
  caption: {
    display: 'none',
  },
  toolbar: {
    minHeight: '30px',
    '&.MuiToolbar-gutters': {
      padding: '0',
    },
  },
})(TablePagination)

export const StyledRowsPerPageBox = withStyles({
  root: {
    color: '#77838f',
    fontSize: '14px',
    fontWeight: 400,
  },
})(Box)

export const StyledNativeSelect = withStyles({
  icon: {
    right: '8px',
  },
})(NativeSelect)

export const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 12,
      margin: '0 8px',
      padding: '4px 18px 8px 6px !important',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase)
