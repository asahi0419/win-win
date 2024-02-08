import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: '2.5% 10%',
      width: '100%',
    },
    thead: {
      borderBottom: `1px solid #f3eeee`,
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
      width: '280px',
      float: 'right',
      marginBottom: '15px',
      marginTop: '15px',
      backgroundColor: '#E0E0E0',
    },
    cdephis: {
      fontWeight: 500,
      borderRadius: '7px',
      padding: '20px',
    },
  }),
)

export default useStyles
