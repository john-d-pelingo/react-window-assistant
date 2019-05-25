import { grey } from '@material-ui/core/colors'
import { createStyles, makeStyles } from '@material-ui/core'

export const useHeaderStyles = makeStyles(theme =>
  createStyles({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: grey['900'],
    },
    toolbar: {
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      color: 'white',
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
  }),
)
