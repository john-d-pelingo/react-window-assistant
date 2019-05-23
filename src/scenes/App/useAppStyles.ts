import { createStyles, makeStyles } from '@material-ui/core'

export const useAppStyles = makeStyles(theme =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
      ul: {
        margin: 0,
        padding: 0,
      },
      li: {
        listStyle: 'none',
      },
    },
    app: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
  }),
)
