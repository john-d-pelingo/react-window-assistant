import { createStyles, makeStyles } from '@material-ui/core'

export const useInterpretationStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  }),
)
