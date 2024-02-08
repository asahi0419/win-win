import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: '2.5% 10%',
      width: '100%',
    },
    thead: {
      borderBottom: `1px solid grey`,
    },
    thtitle: {
      // color: theme.palette.primary.contrastText,
      padding: '10px 15px',
      fontWeight: 500,
      borderBottom: 'none',
      fontSize: '13px',
      backgroundColor: '#E0E0E0',
    },
    tbody: {
      borderBottom: 'none',
      fontSize: '12px',
    },
    nodata: {
      borderBottom: 'none',
      fontSize: '13px',
      marginTop: '15px',
      marginBottom: '15px',
    },
    tbOverflow: {
      borderBottom: 'none',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      width: '100px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    search: {
      width: '200px',
      float: 'right',
      marginBottom: '15px',
      marginTop: '15px',
      backgroundColor: '#E0E0E0',
    },
    cdephis: {
      fontWeight: 500,
      marginTop: '15px',
      borderRadius: '7px',
      padding: '20px',
    },
    error: {
      color: '#f6465d',
      marginLeft: 0,
    },
    textfld: {
      '& label.Mui-focused': {
        color: theme.palette.secondary.main,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'yellow',
        },
      },
    },
    button: {
      backgroundColor: '#4CAF50',
      fontSize: '12px',
      textTransform: 'none',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#4CAF70',
      },
    },
    delete: {
      backgroundColor: '#F50057',
      fontSize: '12px',
      textTransform: 'none',
      marginRight: '10px',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#FF0000',
      },
    },
    delconfirm: {
      padding: '10px',
    },
    btngroup: {
      display: 'flex',
      marginTop: '15px',
    },
    draw: {
      backgroundColor: '#026BFB',
      fontSize: '14px',
      textTransform: 'none',
      color: '#fff',
      marginBottom: '15px',
      marginTop: '15px',
      marginRight: '20px',
      '&:hover': {
        backgroundColor: '#028BFF',
      },
      float: 'right',
      height: '50px',
    },
    cancel: {
      backgroundColor: '#026BFB',
      fontSize: '12px',
      textTransform: 'none',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#028BFF',
      },
    },
    userForm: {
      padding: '20px',
    },
  }),
)

export default useStyles
