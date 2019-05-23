import { createStyles, makeStyles } from '@material-ui/core'

export const useJsonSorterStyles = makeStyles(theme =>
  createStyles({
    container: {
      margin: `${theme.spacing(12.5)}px 0`,
    },
    text: {
      fontFamily: ['Courier New', 'sans-serif'].join(','),
      fontSize: '20px',
    },
    submitBox: {
      marginTop: `${theme.spacing(2)}px`,
    },
    submit: {
      float: 'right',
    },
  }),
)
