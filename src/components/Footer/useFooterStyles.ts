import { createStyles, makeStyles } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

export const useFooterStyles = makeStyles(theme =>
  createStyles({
    footer: {
      backgroundColor: grey['900'],
      color: 'white',
      marginTop: 'auto',
      padding: theme.spacing(2),
    },
  }),
)
