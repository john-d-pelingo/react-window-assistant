import { createStyles, makeStyles } from '@material-ui/core'

export const useColorClarifierStyles = makeStyles(theme =>
  createStyles({
    container: {
      margin: `${theme.spacing(12.5)}px 0`,
    },
  }),
)
