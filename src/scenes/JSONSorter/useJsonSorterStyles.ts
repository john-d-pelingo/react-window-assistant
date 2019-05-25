import { createStyles, makeStyles } from '@material-ui/core'

export const useJsonSorterStyles = makeStyles(theme =>
  createStyles({
    container: {
      margin: `${theme.spacing(12.5)}px 0`,
    },
    inputText: {
      fontFamily: ['Courier New', 'mono'].join(','),
      fontSize: '16px',
    },
  }),
)
