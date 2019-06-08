import { createStyles, makeStyles } from '@material-ui/core'

export const useClarificationStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      width: '100%',
    },
    table: {
      minWidth: 650,
    },
  }),
)
