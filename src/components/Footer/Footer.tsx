import React, { FC } from 'react'
import { Typography } from '@material-ui/core'

import { useFooterStyles } from './useFooterStyles'

export const Footer: FC = () => {
  const classes = useFooterStyles()

  return (
    <footer className={classes.footer}>
      <Typography align="center" color="textSecondary" variant="body2">
        Built with love ❤
      </Typography>
    </footer>
  )
}
