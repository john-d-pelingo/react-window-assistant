import { createStyles, makeStyles } from '@material-ui/core'

export const useFooterStyles = makeStyles(theme =>
  createStyles({
    footer: {
      backgroundColor: 'white',
      marginTop: 'auto',
      padding: theme.spacing(2),
    },
  }),
)
