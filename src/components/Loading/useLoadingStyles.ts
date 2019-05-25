import { createStyles, makeStyles } from '@material-ui/core'

export const useLoadingStyles = makeStyles(theme =>
  createStyles({
    progressBox: {
      width: '100%',
      height: '100%',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progress: {
      margin: theme.spacing(2),
    },
  }),
)
