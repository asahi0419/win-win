import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    calendar: {
      position: 'fixed',
      zIndex: 10000,
      bottom: '230px',
    },
    formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
      float: 'left',
    },
    select: {
      minWidth: 100,
      height: '39px',
      marginTop: '10px',
    },
    userField: {
      marginTop: '10px',
    },
    inputLabel: {
      marginTop: '-5px',
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
    searchBtn: {
      marginRight: '1px',
      height: '40px',
      // verticalAlign: 'top',
      marginTop: '9px',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      // width: '25ch',
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(0),
      width: 250,
      textAlign: 'center',
    },
    red: {
      color: 'red',
    },

    // -------menu style-----
    menu: {
      color: 'black',
      backgroundColor: 'white',
      borderRadius: '100px',
      borderColor: 'black',
      borderBottomWidth: '1px',
      borderTopWidth: '0px',
      borderRight: '0px',
      borderLeft: '0px',
      borderStyle: 'solid',
    },

    root: {
      '& > *': {
        margin: theme.spacing(0),
        width: '20ch',
      },
    },

    // ---clock style---
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: '10px',
      marginBottom: '10px',
    },
    hisTimetxt: {
      marginRight: '4px',
      display: 'flex',
      padding: '4px',
      color: 'black',
      fontWeight: 500,
      fontSize: '12px',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '48px',
      lineHeight: '16px',
    },
    input: {
      // color: theme.palette.secondary.dark,
      cursor: 'pointer',
      color: 'black',
      fontSize: '14px',
      width: '95px',
      height: '25px',
      borderRadius: '7px',
      marginTop: '10px',
      padding: '8px',
      background: 'transparent',
      // border: 'none',
      border: '1px solid rgb(215, 212, 212)',
      '&:focus:not(.focus-visible)': {
        outline: 'none',
      },
    },
    icon1: {
      height: '18px',
      width: '18px',
      padding: '4px',
    },
    help: {
      height: '14px',
      width: '14px',
      padding: '6px',
      color: 'white',
      '&:hover': {
        color: theme.palette.secondary.dark,
      },
    },
    hisSearch: {
      marginRight: '4px',
      color: theme.palette.secondary.dark,
      cursor: 'pointer',
      borderRadius: '2px',
      padding: '4px',
      margin: '0px',
      backgroundColor: localStorage.appTheme === 'darkTheme' ? 'rgb(35,40,45)' : '#fff',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '48px',
      lineHeight: '16px',
      fontWeight: 600,
      '&:hover': {
        backgroundColor: localStorage.appTheme === 'darkTheme' ? '#2b3139' : '#f5f5f5',
        borderRadius: '2px',
        padding: '4px',
      },
    },
    hisReset: {
      marginRight: '4px',
      color: theme.palette.secondary.main,
      cursor: 'pointer',
      borderRadius: '2px',
      padding: '4px',
      margin: '0px',
      fontWeight: 500,
      backgroundColor: localStorage.appTheme === 'darkTheme' ? 'rgb(71, 77, 87)' : '#eaecef',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '48px',
      lineHeight: '16px',
      '&:hover': {
        backgroundColor: localStorage.appTheme === 'darkTheme' ? '#2b3139' : '#f5f5f5',
        borderRadius: '2px',
        padding: '4px',
      },
    },
    flexPosition: {
      display: 'flex',
      maxWidth: '500px',
      justifyContent: 'space-between',
      '@media (max-width: 1150px)': {
        maxWidth: '276px',
        overflowX: 'auto',
      },
      '@media (max-width: 760px)': {
        maxWidth: '500px',
        position: 'relative',
      },
    },
    searchDiv: {
      display: 'flex',
    },
    hide: {
      '@media (max-width: 760px)': {
        display: 'none',
      },
    },
    searchButton_t: {
      // marginTop: theme.spacing(0.5),
      backgroundColor: '#3498db',
      marginTop: '10px',
    },
    starttextField: {
      // width: '25ch',
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      width: '100%',
      textAlign: 'center',
    },
    endtextField: {
      // width: '25ch',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(0),
      width: '100%',
      textAlign: 'center',
    },
    // textField: {
    //   marginLeft: theme.spacing(1),
    //   marginRight: theme.spacing(1),
    //   width: 200,
    // },
  }),
)
