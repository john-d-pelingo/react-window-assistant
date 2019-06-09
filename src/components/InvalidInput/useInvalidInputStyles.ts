import { createStyles, makeStyles } from '@material-ui/core'

export const useInvalidInputStyles = makeStyles(theme =>
  createStyles({
    invalidInput: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
      textAlign: 'center',
    },
  }),
)
