import { Tooltip } from '@material-ui/core'

import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
} from '../../material-dashboard-react'
import { createStyles, Theme, withStyles } from '@material-ui/core'

const headerStyle = (theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      borderBottom: '0',
      marginBottom: '0',
      position: 'absolute',
      width: '100%',
      paddingTop: '10px',
      zIndex: 1029,
      color: grayColor[7],
      border: '0',
      borderRadius: '3px',
      padding: '10px 0',
      transition: 'all 150ms ease 0s',
      minHeight: '50px',
      display: 'block',
    },
    container: {
      ...container,
      minHeight: '50px',
    },
    flex: {
      flex: 1,
    },
    title: {
      ...defaultFont,
      lineHeight: '30px',
      fontSize: '18px',
      borderRadius: '3px',
      textTransform: 'none',
      color: 'inherit',
      margin: '0',
      '&:hover,&:focus': {
        background: 'transparent',
      },
    },
    appResponsive: {
      top: '8px',
    },
    primary: {
      backgroundColor: primaryColor[0],
      color: whiteColor,
      ...defaultBoxShadow,
    },
    info: {
      backgroundColor: infoColor[0],
      color: whiteColor,
      ...defaultBoxShadow,
    },
    success: {
      backgroundColor: successColor[0],
      color: whiteColor,
      ...defaultBoxShadow,
    },
    warning: {
      backgroundColor: warningColor[0],
      color: whiteColor,
      ...defaultBoxShadow,
    },
    danger: {
      backgroundColor: dangerColor[0],
      color: whiteColor,
      ...defaultBoxShadow,
    },
    splitbar: {
      backgroundColor: '#2b3139',
      height: '1px',
    },
    logoutover: {
      cursor: 'pointer',
      '&:hover': {
        borderRadius: '0px 0px 8px 8px',
        '&.img:hover': {
          color: '#303030',
        },
      },
    },
    wallet: {
      display: 'flex',
      minWidth: '0px',
      padding: '16px 0 16px 16px',
      color: '#000',
      fontWeight: 500,
      fontSize: '14px',
      '&:hover': {
        color: '#d7d7d7',
      },
    },
    email: {
      margin: '0px',
      minWidth: '0px',
      padding: '30px 0 16px 16px',
      color: '#000',
      fontWeight: 500,
      fontSize: '16px',
    },
    accountIcon: {
      cursor: 'pointer',
    },
  })

export const AuthMenu = withStyles((theme) => ({
  tooltip: {
    width: '200px',
    maxWidth: '200px',
    borderRadius: '8px',
    padding: 0,
    backgroundColor: '#fff',
    boxShadow: 'rgb(20 21 26 / 10%) 0px 0px 1px, rgb(71 77 87 / 8%) 0px 7px 14px, rgb(20 21 26 / 8%) 0px 3px 6px',
    '&.MuiTooltip-tooltipPlacementBottom': {
      margin: '-20px',
    },
  },
}))(Tooltip)

export default headerStyle
