import { createStyles, makeStyles } from '@material-ui/core'

export const useButtonActionStyles = makeStyles(theme =>
  createStyles({
    buttonActionBox: {
      marginTop: `${theme.spacing(3)}px`,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    copyBtn: {
      marginRight: `${theme.spacing(3)}px`,
    },
    typography: {
      padding: theme.spacing(2),
    },
  }),
)
