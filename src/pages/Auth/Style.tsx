import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles'
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip'

import { InputBase, Checkbox } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.common.black,
      height: '100vh',
    },
    root2: {
      background: theme.palette.common.black,
      height: '100vh',
    },
    appbar: {
      background: 'transparent',
      '&.MuiPaper-elevation4': {
        boxShadow: 'none',
      },
      padding: '0rem 0.5rem',
    },
    toolbar: {
      justifyContent: 'space-between',
      display: 'flex',
      '&.MuiToolbar-gutters': {
        padding: '0 24px 0 16px',
        [theme.breakpoints.down(760)]: {
          padding: '0 0 0 8px',
        },
      },
    },
    fontColor1: {
      color: theme.palette.secondary.dark,
      marginLeft: '0px',
    },
    fontColor2: {
      color: theme.palette.text.hint,
    },
    capcha: {
      paddingTop: '15px',

      '@media (max-width: 400px)': {
        textAlign: '-webkit-center',
      },
    },
    container: {
      maxWidth: '390px',
      marginTop: '50px',
      marginLeft: 'auto',
      marginRight: 'auto',
      boxSizing: 'border-box',
      // overflow: 'hidden',
      flexDirection: 'column',
      flex: '1 1 0%',
      '@media (max-width: 400px)': {
        width: '95%',
        textAlign: 'center',
      },
      padding: '0.5rem',
    },
    container2: {
      maxWidth: '390px',
      marginLeft: 'auto',
      marginRight: 'auto',
      height: '90vh',
      '@media (max-width: 400px)': {
        width: '95%',
        textAlign: 'center',
      },
      padding: '0.5rem',
    },
    themeIcon: {
      fill: theme.palette.secondary.dark,
      '&:hover': {
        fill: '#c99400',
      },
    },
    selectMode: {
      color: theme.palette.secondary.dark,
      padding: '8px 24px',
      lineHeight: '24px',
      fontWeight: 500,
      background: theme.palette.warning.dark,
      marginLeft: '26px',
      borderRadius: '8px',
      cursor: 'pointer',
      '@media (max-width: 400px)': {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    selectMode1: {
      color: theme.palette.secondary.dark,
      padding: '8px 24px',
      lineHeight: '24px',
      fontWeight: 500,
      background: theme.palette.warning.dark,
      borderRadius: '8px',
      cursor: 'pointer',
      '@media (max-width: 400px)': {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    notificationBackground1: { background: '#bf2d29' },
    notificationBackground2: { background: '#0ECB81' },
    leftSide: {
      width: '100%',
    },
    rightSide: {
      width: '300px',
    },
    unSelect: {
      color: theme.palette.secondary.main,
      padding: '8px 24px',
      lineHeight: '24px',
      fontWeight: 500,
      marginLeft: '26px',
      '@media (max-width: 400px)': {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      cursor: 'pointer',
    },
    btnSide: {
      display: 'flex',
      marginTop: '20px',
    },
    btnSide2: {
      display: 'grid',
      marginTop: '20px',
    },
    h2: {
      fontSize: '32px',
      fontWeight: 600,
      marginBottom: '16px',
    },
    helperText: {
      fontSize: '14px',
    },
    helperText2: {
      fontSize: '14px',
      color: 'red',
    },
    formControlSide: {
      width: '100%',
      marginTop: '20px',
    },
    idText: {
      cursor: 'pointer',
    },
    registerBtn: {
      width: '100%',
      padding: '14px 0rem',
      border: 'none',
      color: '#212833',
      background: '#fcd535',
      fontSize: '16px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    error: {
      color: '#f6465d',
      marginLeft: 0,
    },
    link: {
      textDecoration: 'none',
      padding: '6px 12px',
      width: 'max-content',
      height: 'max-content',
      alignSelf: 'center',
    },
    hover: {
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.text.disabled,
      },
    },
    loginLink: {
      fontSize: '14px',
      color: '#fcd535',
      cursor: 'pointer',
      marginBottom: '12px',
      marginLeft: '10px',
      width: '100px',
      textDecoration: 'none',
      textAlign: 'left',
    },
    loginLink2: {
      fontSize: '14px',
      color: '#fcd535',
      cursor: 'pointer',
      marginBottom: '12px',
      width: '100px',
      textAlign: 'left',
      textDecoration: 'none',
    },
    forgotLink: {
      fontSize: '14px',
      color: '#fcd535',
      cursor: 'pointer',
      marginBottom: '12px',
      border: 'none',
      background: 'transparent',
      textDecoration: 'none',
      textAlign: 'left',
      padding: '0px',
      width: '150px',
    },
    subTitle: {
      width: '420px',
      fontWeight: 400,
      marginBottom: '44px',
      '@media (max-width: 450px)': {
        width: '100%',
      },
    },
    notiSide: {
      textAlign: 'center',
      padding: '8px 0px',
      background: theme.palette.warning.main,
    },
    notiText: {
      color: theme.palette.warning.contrastText,
      fontSize: 12,
      fontWeight: 500,
      lineHeight: '16px',
    },
    modal: {
      width: '360px',
      height: 'fit-content',
      background: '#1e2329',
      textAlign: 'center',
      borderRadius: '8px',
      margin: 'auto',
      padding: '2rem 0rem',
      marginTop: '10%',
    },
    modalText: {
      color: '#848e9c',
      fontSize: '16px',
      lineHeight: '24px',
      padding: '0rem 1.5rem',
    },
    cancelBtn: {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
      padding: '10px 12px',
      background: '#474d57',
      color: '#eaecef',
      border: 'none',
      borderRadius: '4px',
      width: '38%',
      '&:hover': {
        background: '#2b3139',
      },
    },
    continueBtn: {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
      padding: '10px 12px',
      background: '#fcd535',
      color: '#212833',
      border: 'none',
      borderRadius: '4px',
      width: '38%',
      textDecoration: 'none',
      marginLeft: '10px',
      '&:hover': {
        background: '#e5c334',
      },
    },
    inputSide: {
      boxSizing: 'border-box',
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      lineHeight: 1.6,
      marginTop: '10px',
      background: 'transparent',
      border: '1px solid #474d57',
      borderRadius: '4px',
      padding: '13px',
      width: '100%',
      justifyContent: 'space-between',
      '&:hover': {
        border: '1px solid #f0b90b',
      },
    },
    inputSide2: {
      boxSizing: 'border-box',
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      lineHeight: 1.6,
      marginTop: '10px',
      background: 'transparent',
      border: '1px solid #f6465d',
      borderRadius: '4px',
      padding: '13px',
      width: '100%',
      justifyContent: 'space-between',
    },
    inputSide3: {
      boxSizing: 'border-box',
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      lineHeight: 1.6,
      marginTop: '10px',
      background: 'transparent',
      border: '1px solid #f0b90b',
      borderRadius: '4px',
      padding: '13px',
      width: '100%',
      justifyContent: 'space-between',
    },
    checkDiv: {
      float: 'left',
    },
    checkDiv1: {
      marginTop: '26px',
      float: 'left',
    },
    checked: {
      color: 'red',
    },
    checkBox: {
      display: 'flex',
    },
    fontColor5: {
      color: '#848E9C',
      fontWeight: 400,
    },
    icon: {
      fill: '#5e6673',
      width: '18px',
      height: '18px',
      '&:hover': {
        fill: '#848e9c',
      },
    },
    h3: {
      fontSize: '14px',
    },
    termlink: {
      color: '#fcd535',
      padding: '12px 0px',
      marginLeft: '-11px',
    },
    text2: {
      color: '#848e9c',
      fontSize: '12px',
      marginBottom: '20px',
    },
    checkEmail: {
      width: '500px',
      '@media (max-width: 360px)': {
        width: '300px',
      },
    },
    checkEmail2: {
      width: '420px',
      '@media (max-width: 360px)': {
        width: '300px',
      },
    },
    titleDiv: {
      textAlign: 'center',
    },
    resendbtn: {
      color: '#fcd535',
      textAlign: 'center',
      background: 'transparent',
      border: 'none',
      marginTop: '8px',
      cursor: 'pointer',
    },
    disableBtn: {
      width: '100%',
      padding: '0.7rem 0rem',
      border: 'none',
      color: '#212833',
      background: '#81702d',
      fontSize: '16px',
      borderRadius: '4px',
      cursor: 'not-allowed',
      marginTop: '40px',
    },
    code: {
      background: 'transparent',
      border: 'none',
      color: '#fcd535',
      cursor: 'pointer',
      width: '22%',
    },
    text: {
      marginTop: '40px',
    },
    codeText: {
      fontSize: '16px',
      marginTop: '44px',
      marginBottom: '15px',
    },
    input: {
      color: theme.palette.secondary.dark,
      fontSize: '14px',
      background: 'transparent',
      border: 'none',
      width: '100%',
      '&:focus:not(.focus-visible)': {
        outline: 'none',
      },
    },
    registerFormContainer: {
      width: '384px',
      marginTop: '64px',
      marginLeft: 'auto',
      marginRight: 'auto',
      '@media (max-width: 500px)': {
        width: '100%',
        marginTop: '20px',
      },
    },
    h4: {
      fontSize: '24px',
      fontWeight: 600,
      marginBottom: '16px',
    },
    footer: {
      color: '#B7BDC6',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
      padding: '12px',
      '@media (min-height:860px)': {
        position: 'absolute',
        bottom: '0px',
      },
    },
    footer1: {
      color: '#B7BDC6',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
      textAlign: 'center',
      // width: '100%',
      boxSizing: 'border-box',
      padding: '12px',
      '@media (min-height:782px)': {
        position: 'absolute',
        bottom: '0px',
      },
    },
    footer2: {
      color: '#B7BDC6',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
      padding: '12px',
      '@media (min-height: 550px)': {
        position: 'absolute',
        bottom: '0px',
      },
    },
    strongPasswordDiv: {
      background: '#2b3139',
      borderRadius: '4px',
      padding: '0.5rem 1rem',
      width: 'fit-content',
    },
    passwordTooltipDiv: {
      background: 'transparent',
      zIndex: 1000,
      '@media (max-width: 400px)': {
        marginTop: '170px',
        marginLeft: '60px',
      },
      '@media (max-width: 890px)': {
        marginTop: '170px',
      },
    },
    strongPasswordText: {
      fontSize: '14px',
      color: '#848E9C',
      lineHeight: '28px',
      textAlign: 'start',
    },
    nextBtn: {
      paddingTop: '15px',
    },
    text4: {
      width: '100%',
      display: 'block',
    },
    icon5: {
      verticalAlign: 'middle',
      fill: '#f6465d',
      width: '18px',
      height: '18px',
      marginRight: '6px',
    },
    icon6: {
      verticalAlign: 'middle',
      fill: '#46f673',
      width: '18px',
      height: '18px',
      marginRight: '6px',
    },
    authForm: {
      width: '400px',
      padding: '30px',
      backgroundColor: '#f1efef',
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '5%',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
  }),
)

export const StyledOutlineInput = withStyles((theme) => ({
  root: {
    border: '1px solid' + theme.palette.common.white,
    borderRadius: '4px',
    width: '100%',
    color: theme.palette.secondary.dark,
    '&:hover': {
      border: '1px solid #f0b90b',
    },
    padding: '0.3rem 0.5rem',
  },
  input: {
    background: 'transparent',
    // border: "none",
    '&:-internal-autofill-selected': {
      background: 'transparent !important',
    },
  },
}))(InputBase)

export const StyledCheckBox = withStyles((theme) => ({
  root: {
    color: '#848e9c',
    width: '16px',
    height: '16px',
    '&.MuiCheckbox-colorSecondary.Mui-checked': {
      color: '#fcd535',
    },
  },
}))(Checkbox)

export const Bluetooltip = makeStyles(() => ({
  arrow: {
    color: '#001F68',
  },
  tooltip: {
    backgroundColor: '#001F68',
    width: '190px',
    textAlign: 'center',
    fontSize: '12px',
  },
}))

export default function BootstrapTooltip(props: TooltipProps) {
  const classes = Bluetooltip()

  return <Tooltip arrow classes={classes} {...props} />
}
