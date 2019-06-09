import { AppBar, Link as MaterialLink, Toolbar } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Link, LinkGetProps } from '@reach/router'
import React, { FC } from 'react'

import {
  colorClarifier,
  home,
  jsonSorter,
  urlInterpreter,
} from 'consants/routes'
import { appName } from 'consants/strings'

import { useHeaderStyles } from './useHeaderStyles'

const getActiveStyles = ({ isCurrent, href, location }: LinkGetProps) => {
  const isCompletelyCurrent = href === location.pathname || isCurrent
  return {
    style: {
      color: isCompletelyCurrent ? red['900'] : 'inherit',
      fontWeight: isCompletelyCurrent ? 'bold' : 'current',
    },
  }
}

export const Header: FC = () => {
  const classes = useHeaderStyles()

  // TODO: transform to burger menu or something
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
          <MaterialLink
            className={classes.link}
            color="textPrimary"
            component={Link}
            getProps={getActiveStyles}
            to={colorClarifier}
            variant="button"
          >
            Color Clarifier
          </MaterialLink>
        </nav>
      </Toolbar>
    </AppBar>
  )
}
