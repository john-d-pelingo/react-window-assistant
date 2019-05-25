import React, { FC } from 'react'
import { Box, CircularProgress } from '@material-ui/core'

import { useLoadingStyles } from './useLoadingStyles'

export const Loading: FC = () => {
  const classes = useLoadingStyles()

  return (
    <Box className={classes.progressBox}>
      <CircularProgress className={classes.progress} color="primary" />
    </Box>
  )
}
