import React, { FC } from 'react'
import { Link, LinkGetProps } from '@reach/router'
import { AppBar, Link as MaterialLink, Toolbar } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

import { home, jsonSorter, urlInterpreter } from 'consants/routes'
import { appName } from 'consants/strings'

import { useHeaderStyles } from './useHeaderStyles'

const getActiveStyles = ({ isCurrent }: LinkGetProps) => ({
  style: {
    color: isCurrent ? red['900'] : 'inherit',
    fontWeight: isCurrent ? 'bold' : 'current',
  },
})

export const Header: FC = () => {
  const classes = useHeaderStyles()

  return (
    <AppBar
      className={classes.appBar}
      color="default"
      elevation={0}
      position="static"
    >
      <Toolbar className={classes.toolbar}>
        <MaterialLink
          color="inherit"
          component={Link}
          noWrap
          to={home}
          variant="h6"
        >
          {appName}
        </MaterialLink>
        <nav>
          <MaterialLink
            className={classes.link}
            color="textPrimary"
            component={Link}
            getProps={getActiveStyles}
            to={home}
            variant="button"
          >
            Home
          </MaterialLink>
          <MaterialLink
            className={classes.link}
            color="textPrimary"
            component={Link}
            getProps={getActiveStyles}
            to={jsonSorter}
            variant="button"
          >
            JSON Sorter
          </MaterialLink>
          <MaterialLink
            className={classes.link}
            color="textPrimary"
            component={Link}
            getProps={getActiveStyles}
            to={urlInterpreter}
            variant="button"
          >
            URL Interpreter
          </MaterialLink>
        </nav>
      </Toolbar>
    </AppBar>
  )
}
