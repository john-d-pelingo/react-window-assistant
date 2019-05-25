import React, { FC } from 'react'
import { Link, Typography } from '@material-ui/core'

import { useFooterStyles } from './useFooterStyles'

export const Footer: FC = () => {
  const classes = useFooterStyles()

  return (
    <footer className={classes.footer}>
      <Typography align="center" variant="body2">
        Built with{' '}
        <Link
          href="https://facebook.github.io/create-react-app/docs/adding-typescript#docsNav"
          rel="noreferrer noopener"
          target="_blank"
        >
          React and TypeScript
        </Link>
        !
      </Typography>
    </footer>
  )
}
