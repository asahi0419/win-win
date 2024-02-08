import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    coin_img: {
      display: 'flex',
      alignItems: 'center',
    },
    coin_balance: {
      fontSize: '35px',
    },
    text: {
      marginLeft: '10px',
      fontSize: '20px',
    },
  }),
)

export default useStyles
