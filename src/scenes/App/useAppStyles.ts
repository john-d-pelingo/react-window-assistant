import { createStyles, makeStyles } from '@material-ui/core'

export const useAppStyles = makeStyles(theme =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
      li: {
        listStyle: 'none',
      },
      ul: {
        margin: 0,
        padding: 0,
      },
    },
    app: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
  }),
)
